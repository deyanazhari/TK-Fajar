package com.tkfajar.backend.controller;

import com.tkfajar.backend.dto.AdminLoginRequest;
import com.tkfajar.backend.model.Admin;
import com.tkfajar.backend.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}, allowCredentials = "true")
public class AdminController {
    
    private final AdminService adminService;
    
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody AdminLoginRequest loginRequest) {
        try {
            String sessionId = adminService.login(loginRequest);
            Admin loggedInAdmin = adminService.getCurrentAdmin(sessionId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("sessionId", sessionId);
            response.put("role", loggedInAdmin.getRole().toLowerCase().replace("_", ""));
            response.put("message", "Login berhasil");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(@RequestHeader("X-Session-ID") String sessionId) {
        boolean success = adminService.logout(sessionId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "Logout berhasil" : "Session tidak valid");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentAdmin(@RequestHeader("X-Session-ID") String sessionId) {
        if (!adminService.isValidSession(sessionId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Session tidak valid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        Admin admin = adminService.getCurrentAdmin(sessionId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("admin", Map.of(
            "id", admin.getId(),
            "username", admin.getUsername(),
            "role", admin.getRole(),
            "lastLogin", admin.getLastLogin()
        ));
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/check-session")
    public ResponseEntity<Map<String, Object>> checkSession(@RequestHeader("X-Session-ID") String sessionId) {
        boolean isValid = adminService.isValidSession(sessionId);
        long remainingTime = adminService.getSessionRemainingTime(sessionId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("valid", isValid);
        response.put("remainingTime", remainingTime);
        response.put("timeoutMinutes", 20);
        response.put("message", isValid ? "Session valid" : "Session tidak valid");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createAdmin(
            @RequestHeader("X-Session-ID") String sessionId,
            @RequestBody Map<String, String> request) {
        
        if (!adminService.isValidSession(sessionId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Session tidak valid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        try {
            String username = request.get("username");
            String password = request.get("password");
            Admin newAdmin = adminService.createAdmin(username, password);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Admin berhasil dibuat");
            response.put("admin", Map.of(
                "id", newAdmin.getId(),
                "username", newAdmin.getUsername(),
                "role", newAdmin.getRole()
            ));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(
            @RequestHeader("X-Session-ID") String sessionId,
            @RequestBody Map<String, String> request) {
        
        if (!adminService.isValidSession(sessionId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Session tidak valid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        try {
            String currentPassword = request.get("currentPassword");
            String newPassword = request.get("newPassword");
            String confirmPassword = request.get("confirmPassword");
            
            if (currentPassword == null || currentPassword.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Password saat ini wajib diisi");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (newPassword == null || newPassword.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Password baru wajib diisi");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (newPassword.length() < 6) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Password baru minimal 6 karakter");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (!newPassword.equals(confirmPassword)) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Konfirmasi password baru tidak cocok");
                return ResponseEntity.badRequest().body(response);
            }
            
            Admin admin = adminService.getCurrentAdmin(sessionId);
            adminService.changePassword(admin.getUsername(), currentPassword, newPassword);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Password berhasil diubah");
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> listAdmins(@RequestHeader("X-Session-ID") String sessionId) {
        if (!adminService.isValidSession(sessionId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Session tidak valid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        // Only super admins can list admins
        Admin currentAdmin = adminService.getCurrentAdmin(sessionId);
        if (!currentAdmin.getRole().equals("SUPER_ADMIN")) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Akses ditolak. Hanya super admin yang dapat mengakses daftar admin.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
        
        try {
            List<Admin> admins = adminService.getAllAdmins();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("admins", admins.stream().map(admin -> Map.of(
                "id", admin.getId(),
                "username", admin.getUsername(),
                "role", admin.getRole().toLowerCase().replace("_", ""),
                "createdAt", admin.getCreatedAt(),
                "lastLogin", admin.getLastLogin(),
                "active", admin.isActive()
            )).toList());
            response.put("message", "Daftar admin berhasil diambil");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Gagal mengambil daftar admin");
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/update/{adminId}")
    public ResponseEntity<Map<String, Object>> updateAdmin(
            @RequestHeader("X-Session-ID") String sessionId,
            @PathVariable Long adminId,
            @RequestBody Map<String, String> request) {
        
        if (!adminService.isValidSession(sessionId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Session tidak valid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        // Only super admins can update admins
        Admin currentAdmin = adminService.getCurrentAdmin(sessionId);
        if (!currentAdmin.getRole().equals("SUPER_ADMIN")) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Akses ditolak. Hanya super admin yang dapat mengupdate admin.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
        
        try {
            String username = request.get("username");
            String password = request.get("password");
            String role = request.get("role");
            
            Admin updatedAdmin = adminService.updateAdmin(adminId, username, password, role);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Admin berhasil diupdate");
            response.put("admin", Map.of(
                "id", updatedAdmin.getId(),
                "username", updatedAdmin.getUsername(),
                "role", updatedAdmin.getRole().toLowerCase().replace("_", "")
            ));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/delete/{adminId}")
    public ResponseEntity<Map<String, Object>> deleteAdmin(
            @RequestHeader("X-Session-ID") String sessionId,
            @PathVariable Long adminId) {
        
        if (!adminService.isValidSession(sessionId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Session tidak valid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        // Only super admins can delete admins
        Admin currentAdmin = adminService.getCurrentAdmin(sessionId);
        if (!currentAdmin.getRole().equals("SUPER_ADMIN")) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Akses ditolak. Hanya super admin yang dapat menghapus admin.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
        
        // Prevent self-deletion
        if (currentAdmin.getId().toString().equals(adminId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Tidak dapat menghapus akun sendiri");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            adminService.deleteAdmin(adminId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Admin berhasil dihapus");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/create-admin")
    public ResponseEntity<Map<String, Object>> createAdminWithRole(
            @RequestHeader("X-Session-ID") String sessionId,
            @RequestBody Map<String, String> request) {
        
        if (!adminService.isValidSession(sessionId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Session tidak valid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        // Only super admins can create admins with roles
        Admin currentAdmin = adminService.getCurrentAdmin(sessionId);
        if (!currentAdmin.getRole().equals("SUPER_ADMIN")) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Akses ditolak. Hanya super admin yang dapat membuat admin baru.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
        
        try {
            String username = request.get("username");
            String password = request.get("password");
            String role = request.get("role");
            
            if (username == null || username.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Username wajib diisi");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (password == null || password.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Password wajib diisi");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (password.length() < 6) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Password minimal 6 karakter");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Default to ADMIN if no role specified
            if (role == null || role.trim().isEmpty()) {
                role = "ADMIN";
            }
            
            // Convert role to backend format
            String backendRole = role.equals("superadmin") ? "SUPER_ADMIN" : "ADMIN";
            
            Admin newAdmin = adminService.createAdminWithRole(username, password, backendRole);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Admin berhasil dibuat");
            response.put("admin", Map.of(
                "id", newAdmin.getId(),
                "username", newAdmin.getUsername(),
                "role", newAdmin.getRole().toLowerCase().replace("_", "")
            ));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}