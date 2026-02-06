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
    @NotNull(message = "Email wajib diisi")
    private String email;
    private String agama;
    @NotNull(message = "Tempat Lahir wajib diisi")
    private String tempatLahir;
    @NotNull(message = "Jenis Kelamin wajib dipilih")
    private String jenisKelamin;

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

    public @NotNull(message = "Email wajib diisi") String getEmail() {
        return email;
    }

    public void setEmail(@NotNull(message = "Email wajib diisi") String email) {
        this.email = email;
    }

    public String getAgama() {
        return agama;
    }

    public void setAgama(String agama) {
        this.agama = agama;
    }

    public @NotNull(message = "Tempat Lahir wajib diisi") String getTempatLahir() {
        return tempatLahir;
    }

    public void setTempatLahir(@NotNull(message = "Tempat Lahir wajib diisi") String tempatLahir) {
        this.tempatLahir = tempatLahir;
    }

    public @NotNull(message = "Jenis Kelamin wajib dipilih") String getJenisKelamin() {
        return jenisKelamin;
    }

    public void setJenisKelamin(@NotNull(message = "Jenis Kelamin wajib dipilih") String jenisKelamin) {
        this.jenisKelamin = jenisKelamin;
    }
}