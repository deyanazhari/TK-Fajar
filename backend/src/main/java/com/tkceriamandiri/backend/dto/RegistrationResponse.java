package com.tkceriamandiri.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RegistrationResponse {
    
    private Long id;
    private String parentName;
    private String childName;
    private String whatsapp;
    private LocalDateTime createdAt;
    private String message;
    
    public RegistrationResponse(Long id, String parentName, String childName, String whatsapp, LocalDateTime createdAt, String message) {
        this.id = id;
        this.parentName = parentName;
        this.childName = childName;
        this.whatsapp = whatsapp;
        this.createdAt = createdAt;
        this.message = message;
    }
}