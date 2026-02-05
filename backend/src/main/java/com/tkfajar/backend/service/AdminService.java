package com.tkfajar.backend.service;

import com.tkfajar.backend.dto.AdminLoginRequest;
import com.tkfajar.backend.model.Admin;
import com.tkfajar.backend.repository.AdminMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {
    
    private final AdminMongoRepository adminRepository;
    private final Map<String, Admin> activeSessions = new HashMap<>();
    private final Map<String, LocalDateTime> sessionExpiry = new HashMap<>();
    private static final long SESSION_TIMEOUT_MINUTES = 20;
    
    @Autowired
    public AdminService(AdminMongoRepository adminRepository) {
        this.adminRepository = adminRepository;
        initializeDefaultAdmin();
    }
    
    private void initializeDefaultAdmin() {
        // Create super admin if not exists
        if (!adminRepository.existsByUsername("superadmin")) {
            Admin superAdmin = new Admin("superadmin", "super123");
            superAdmin.setRole("SUPER_ADMIN");
            adminRepository.save(superAdmin);
        }
        
        // Create regular admin if not exists
        if (!adminRepository.existsByUsername("admin")) {
            Admin defaultAdmin = new Admin("admin", "admin123");
            defaultAdmin.setRole("ADMIN");
            adminRepository.save(defaultAdmin);
        }
    }
    
    public String login(AdminLoginRequest loginRequest) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(loginRequest.getUsername());
        
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.isActive() && admin.getPassword().equals(loginRequest.getPassword())) {
                String sessionId = UUID.randomUUID().toString();
                admin.setLastLogin(LocalDateTime.now());
                adminRepository.save(admin);
                activeSessions.put(sessionId, admin);
                sessionExpiry.put(sessionId, LocalDateTime.now().plusMinutes(SESSION_TIMEOUT_MINUTES));
                return sessionId;
            }
        }
        throw new RuntimeException("Username atau password salah");
    }
    
    public boolean logout(String sessionId) {
        sessionExpiry.remove(sessionId);
        return activeSessions.remove(sessionId) != null;
    }
    
    public boolean isValidSession(String sessionId) {
        // Check if session exists and not expired
        LocalDateTime expiryTime = sessionExpiry.get(sessionId);
        if (expiryTime == null) {
            return false;
        }
        
        if (LocalDateTime.now().isAfter(expiryTime)) {
            // Session expired, clean up
            activeSessions.remove(sessionId);
            sessionExpiry.remove(sessionId);
            return false;
        }
        
        return true;
    }
    
    public long getSessionRemainingTime(String sessionId) {
        LocalDateTime expiryTime = sessionExpiry.get(sessionId);
        if (expiryTime == null) {
            return 0;
        }
        
        LocalDateTime now = LocalDateTime.now();
        if (now.isAfter(expiryTime)) {
            return 0;
        }
        
        return java.time.Duration.between(now, expiryTime).getSeconds();
    }
    
    public Admin getCurrentAdmin(String sessionId) {
        return activeSessions.get(sessionId);
    }
    
    public Admin createAdmin(String username, String password) {
        if (adminRepository.existsByUsername(username)) {
            throw new RuntimeException("Username sudah ada");
        }
        Admin newAdmin = new Admin(username, password);
        return adminRepository.save(newAdmin);
    }
    
    public void changePassword(String username, String oldPassword, String newPassword) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(oldPassword)) {
                admin.setPassword(newPassword);
                adminRepository.save(admin);
            } else {
                throw new RuntimeException("Password lama salah");
            }
        } else {
            throw new RuntimeException("Admin tidak ditemukan");
        }
    }
    
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
    
    public Admin updateAdmin(Long adminId, String newUsername, String newPassword, String newRole) {
        Optional<Admin> adminOpt = adminRepository.findById(adminId);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            
            // Check if new username is already taken by another admin
            if (!admin.getUsername().equals(newUsername) && adminRepository.existsByUsername(newUsername)) {
                throw new RuntimeException("Username sudah ada");
            }
            
            // Update username if provided
            if (newUsername != null && !newUsername.trim().isEmpty()) {
                admin.setUsername(newUsername);
            }
            
            // Update password if provided
            if (newPassword != null && !newPassword.trim().isEmpty()) {
                admin.setPassword(newPassword);
            }
            
            // Update role if provided and valid
            if (newRole != null && !newRole.trim().isEmpty() && 
                (newRole.equals("ADMIN") || newRole.equals("SUPER_ADMIN"))) {
                admin.setRole(newRole);
            }
            
            return adminRepository.save(admin);
        } else {
            throw new RuntimeException("Admin tidak ditemukan");
        }
    }
    
    public void deleteAdmin(Long adminId) {
        if (!adminRepository.existsById(adminId)) {
            throw new RuntimeException("Admin tidak ditemukan");
        }
        adminRepository.deleteById(adminId);
    }
    
    public Admin createAdminWithRole(String username, String password, String role) {
        if (adminRepository.existsByUsername(username)) {
            throw new RuntimeException("Username sudah ada");
        }
        
        // Validate role
        if (role == null || (!role.equals("ADMIN") && !role.equals("SUPER_ADMIN"))) {
            role = "ADMIN"; // Default to ADMIN
        }
        
        Admin newAdmin = new Admin(username, password);
        newAdmin.setRole(role);
        return adminRepository.save(newAdmin);
    }
}