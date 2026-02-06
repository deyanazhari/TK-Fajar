package com.tkfajar.backend.service;

import com.tkfajar.backend.dao.AdminDao;
import com.tkfajar.backend.dto.AdminLoginRequest;
import com.tkfajar.backend.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * Service layer for Admin operations using DAO pattern
 * Provides business logic and session management
 */
@Service
public class AdminDaoService {
    
    private final AdminDao adminDao;
    private final Map<String, Admin> activeSessions = new HashMap<>();
    private final Map<String, LocalDateTime> sessionExpiry = new HashMap<>();
    private static final long SESSION_TIMEOUT_MINUTES = 120;
    
    @Autowired
    public AdminDaoService(AdminDao adminDao) {
        this.adminDao = adminDao;
        // Initialize default admin on startup
        initializeDefaultAdmin();
    }
    
    /**
     * Initialize default admin if no admins exist
     */
    private void initializeDefaultAdmin() {
        long adminCount = adminDao.count();
        if (adminCount == 0) {
            Admin defaultAdmin = new Admin();
            defaultAdmin.setUsername("admin");
            defaultAdmin.setPassword("$2a$12$bF$e9G$g$56W$8$2$4$e$06"); // In production, use proper password hashing
            defaultAdmin.setRole("superadmin");
            defaultAdmin.setActive(true);
            defaultAdmin.setCreatedAt(LocalDateTime.now());
            adminDao.save(defaultAdmin);
        }
    }
    
    /**
     * Authenticate admin login
     */
    public Map<String, Object> login(AdminLoginRequest loginRequest) {
        Optional<Admin> adminOpt = adminDao.findByUsername(loginRequest.getUsername());
        
        if (adminOpt.isEmpty()) {
            return Map.of(
                "success", false,
                "message", "Username atau password salah"
            );
        }
        
        Admin admin = adminOpt.get();
        
        // Check password (in production, use proper password verification)
        if (!admin.getPassword().equals(loginRequest.getPassword())) {
            return Map.of(
                "success", false,
                "message", "Username atau password salah"
            );
        }
        
        if (!admin.isActive()) {
            return Map.of(
                "success", false,
                "message", "Akun admin tidak aktif"
            );
        }
        
        // Create session
        String sessionId = UUID.randomUUID().toString();
        activeSessions.put(sessionId, admin);
        sessionExpiry.put(sessionId, LocalDateTime.now().plusMinutes(SESSION_TIMEOUT_MINUTES*60));
        
        // Update last login
        adminDao.updateLastLogin(admin.getId(), LocalDateTime.now());
        
        return Map.of(
            "success", true,
            "message", "Login berhasil",
            "sessionId", sessionId,
            "username", admin.getUsername(),
            "role", admin.getRole()
        );
    }
    
    /**
     * Logout admin and remove session
     */
    public boolean logout(String sessionId) {
        Admin admin = activeSessions.remove(sessionId);
        sessionExpiry.remove(sessionId);
        
        if (admin != null) {
            // Note: We don't deactivate the admin, just remove the session
            return true;
        }
        
        return false;
    }
    
    /**
     * Check if session is valid
     */
    public boolean isValidSession(String sessionId) {
        if (sessionId == null || !activeSessions.containsKey(sessionId)) {
            return false;
        }
        
        LocalDateTime expiryTime = sessionExpiry.get(sessionId);
        return expiryTime != null && expiryTime.isAfter(LocalDateTime.now());
    }
    
    /**
     * Get admin by session ID
     */
    public Admin getCurrentAdmin(String sessionId) {
        return activeSessions.get(sessionId);
    }
    
    /**
     * Get remaining session time in seconds
     */
    public long getSessionRemainingTime(String sessionId) {
        LocalDateTime expiryTime = sessionExpiry.get(sessionId);
        if (expiryTime == null) {
            return 0;
        }
        
        return java.time.Duration.between(LocalDateTime.now(), expiryTime).getSeconds();
    }
    
    /**
     * Get all admins
     */
    public List<Admin> getAllAdmins() {
        return adminDao.findAll();
    }
    
    /**
     * Get admin by ID
     */
    public Optional<Admin> getAdminById(Long id) {
        return adminDao.findById(id);
    }
    
    /**
     * Create new admin
     */
    public Admin createAdmin(Admin admin) {
        admin.setActive(true);
        admin.setCreatedAt(LocalDateTime.now());
        return adminDao.save(admin);
    }
    
    /**
     * Update admin
     */
    public Admin updateAdmin(Admin admin) {
        return adminDao.update(admin);
    }
    
    /**
     * Delete admin
     */
    public boolean deleteAdmin(Long id) {
        // Remove from active sessions first
        activeSessions.values().removeIf(admin -> admin.getId().equals(id));
        return true;
    }
    
    /**
     * Get admin statistics
     */
    public Map<String, Object> getAdminStatistics() {
        List<Admin> admins = adminDao.findAll();
        long totalAdmins = admins.size();
        long activeAdmins = admins.stream().mapToLong(a -> a.isActive() ? 1 : 0).sum();
        long superAdmins = admins.stream().mapToLong(a -> "superadmin".equals(a.getRole()) ? 1 : 0).sum();
        
        return Map.of(
            "total", totalAdmins,
            "active", activeAdmins,
            "superadmin", superAdmins,
            "admin", totalAdmins - superAdmins
        );
    }
}