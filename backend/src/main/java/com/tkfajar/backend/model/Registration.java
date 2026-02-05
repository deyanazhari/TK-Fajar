package com.tkfajar.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "registrations")
public class Registration {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nama orang tua wajib diisi")
    private String parentName;
    
    @NotBlank(message = "Nama anak wajib diisi")
    private String childName;
    
    @NotBlank(message = "Nomor WhatsApp wajib diisi")
    @Pattern(regexp = "^[0-9]{10,13}$", message = "Format nomor WhatsApp tidak valid")
    private String whatsapp;
    
    @NotBlank(message = "Alamat wajib diisi")
    private String alamat;
    
    @NotNull(message = "Tanggal lahir anak wajib diisi")
    private LocalDate tanggalLahir;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    public Registration() {
    }
    
    public Registration(String parentName, String childName, String whatsapp, String alamat, LocalDate tanggalLahir) {
        this.parentName = parentName;
        this.childName = childName;
        this.whatsapp = whatsapp;
        this.alamat = alamat;
        this.tanggalLahir = tanggalLahir;
        this.createdAt = LocalDateTime.now();
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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
}