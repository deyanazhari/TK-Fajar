package com.tkfajar.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class AdminLoginRequest {
    
    @NotBlank(message = "Username wajib diisi")
    private String username;
    
    @NotBlank(message = "Password wajib diisi")
    private String password;
    
    public AdminLoginRequest() {}
    
    public AdminLoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}