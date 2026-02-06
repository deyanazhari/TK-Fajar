package com.tkfajar.backend.config;

import com.tkfajar.backend.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminSessionInterceptor implements HandlerInterceptor {
    
    private final AdminService adminService;
    
    @Autowired
    public AdminSessionInterceptor(AdminService adminService) {
        this.adminService = adminService;
    }
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getRequestURI();
        
        // Skip authentication for login and public endpoints
        if (path.startsWith("/api/admin/login") || 
            path.startsWith("/api/registration") || 
            path.startsWith("/api/admin/health") ||
            path.equals("/api/admin/check-session")) {
            return true;
        }
        
        // Check for admin endpoints
        if (path.startsWith("/api/admin/")) {
            String sessionId = request.getHeader("X-Session-ID");
            if (sessionId == null || !adminService.isValidSession(sessionId)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"success\": false, \"message\": \"Session tidak valid atau tidak ada\"}");
                return false;
            }
        }
        
        return true;
    }
}