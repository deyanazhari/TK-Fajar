package com.tkfajar.backend.dto;

import java.time.LocalDateTime;
import java.time.LocalDate;

public class RegistrationResponse {
    
    private Long id;
    private String parentName;
    private String childName;
    private String whatsapp;
    private String alamat;
    private LocalDate tanggalLahir;
    private LocalDateTime createdAt;
    private boolean success;
    private String message;
    
    public RegistrationResponse() {
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public RegistrationResponse(Long id, String parentName, String childName, String whatsapp, String alamat, LocalDate tanggalLahir, LocalDateTime createdAt, String message) {
        this.success = true;
        this.id = id;
        this.parentName = parentName;
        this.childName = childName;
        this.whatsapp = whatsapp;
        this.alamat = alamat;
        this.tanggalLahir = tanggalLahir;
        this.createdAt = createdAt;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getChildName() {
        return childName;
    }

    public void setChildName(String childName) {
        this.childName = childName;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public LocalDate getTanggalLahir() {
        return tanggalLahir;
    }

    public void setTanggalLahir(LocalDate tanggalLahir) {
        this.tanggalLahir = tanggalLahir;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}