package com.tkfajar.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.tkfajar.backend.config.LocalDateDeserializer;

public class RegistrationRequest {
    
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
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate tanggalLahir;

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
}