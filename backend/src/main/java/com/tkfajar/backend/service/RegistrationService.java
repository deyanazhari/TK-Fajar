package com.tkfajar.backend.service;

import com.tkfajar.backend.dto.RegistrationRequest;
import com.tkfajar.backend.dto.RegistrationResponse;
import com.tkfajar.backend.model.Registration;
import com.tkfajar.backend.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {
    
    private final RegistrationRepository registrationRepository;
    
    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }
    
    public RegistrationResponse submitRegistration(RegistrationRequest request) {
        // Check if WhatsApp number already exists
        if (registrationRepository.existsByWhatsapp(request.getWhatsapp())) {
            throw new RuntimeException("Nomor WhatsApp sudah terdaftar");
        }
        
        Registration registration = new Registration();
        registration.setParentName(request.getParentName());
        registration.setChildName(request.getChildName());
        registration.setWhatsapp(request.getWhatsapp());
        registration.setAlamat(request.getAlamat());
        registration.setTanggalLahir(request.getTanggalLahir());
        registration.setCreatedAt(LocalDateTime.now());
        registration.setEmail(request.getEmail());
        registration.setAgama(request.getAgama());
        registration.setJenisKelamin(request.getJenisKelamin());
        registration.setTempatLahir(request.getTempatLahir());
        
        Registration savedRegistration = registrationRepository.save(registration);
        
        return new RegistrationResponse(
            savedRegistration.getId(),
            savedRegistration.getParentName(),
            savedRegistration.getChildName(),
            savedRegistration.getWhatsapp(),
            savedRegistration.getAlamat(),
            savedRegistration.getTanggalLahir(),
            savedRegistration.getCreatedAt(),
            savedRegistration.getEmail(),
            savedRegistration.getAgama(),
            savedRegistration.getTempatLahir(),
            savedRegistration.getJenisKelamin(),
            "Pendaftaran berhasil! Kami akan segera menghubungi Anda."
        );
    }
    
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }
    
    public Optional<Registration> getRegistrationById(Long id) {
        return registrationRepository.findById(id);
    }
    
    public Optional<Registration> getRegistrationByWhatsapp(String whatsapp) {
        return registrationRepository.findByWhatsapp(whatsapp);
    }
    
    public boolean deleteRegistration(Long id) {
        if (registrationRepository.existsById(id)) {
            registrationRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public void deleteAllRegistrations() {
        registrationRepository.deleteAll();
    }
}