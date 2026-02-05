package com.tkfajar.backend.service;

import com.tkfajar.backend.dto.RegistrationRequest;
import com.tkfajar.backend.dto.RegistrationResponse;
import com.tkfajar.backend.model.Registration;
import com.tkfajar.backend.repository.RegistrationMongoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {
    
    private final RegistrationMongoRepository registrationRepository;
    
    public RegistrationService(RegistrationMongoRepository registrationRepository) {
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
        
        Registration savedRegistration = registrationRepository.save(registration);
        
        return new RegistrationResponse(
            savedRegistration.getId(),
            savedRegistration.getParentName(),
            savedRegistration.getChildName(),
            savedRegistration.getWhatsapp(),
            savedRegistration.getAlamat(),
            savedRegistration.getTanggalLahir(),
            savedRegistration.getCreatedAt(),
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
}