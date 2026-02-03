package com.tkceriamandiri.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegistrationRequest {
    
    @NotBlank(message = "Nama orang tua wajib diisi")
    private String parentName;
    
    @NotBlank(message = "Nama anak wajib diisi")
    private String childName;
    
    @NotBlank(message = "Nomor WhatsApp wajib diisi")
    @Pattern(regexp = "^[0-9]{10,13}$", message = "Format nomor WhatsApp tidak valid")
    private String whatsapp;
}