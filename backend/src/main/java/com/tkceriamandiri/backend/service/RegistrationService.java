package com.tkceriamandiri.backend.service;

import com.tkceriamandiri.backend.dto.RegistrationRequest;
import com.tkceriamandiri.backend.dto.RegistrationResponse;
import com.tkceriamandiri.backend.model.Registration;
import com.tkceriamandiri.backend.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistrationService {
    
    private final RegistrationRepository registrationRepository;
    
    public RegistrationResponse submitRegistration(RegistrationRequest request) {
        // Check if WhatsApp number already exists
        if (registrationRepository.existsByWhatsapp(request.getWhatsapp())) {
            throw new RuntimeException("Nomor WhatsApp sudah terdaftar");
        }
        
        Registration registration = new Registration();
        registration.setParentName(request.getParentName());
        registration.setChildName(request.getChildName());
        registration.setWhatsapp(request.getWhatsapp());
        
        Registration savedRegistration = registrationRepository.save(registration);
        
        return new RegistrationResponse(
            savedRegistration.getId(),
            savedRegistration.getParentName(),
            savedRegistration.getChildName(),
            savedRegistration.getWhatsapp(),
            savedRegistration.getCreatedAt(),
            "Pendaftaran berhasil! Kami akan segera menghubungi Anda."
        );
    }
    
    @Transactional(readOnly = true)
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Optional<Registration> getRegistrationById(Long id) {
        return registrationRepository.findById(id);
    }
    
    @Transactional(readOnly = true)
    public Optional<Registration> getRegistrationByWhatsapp(String whatsapp) {
        return registrationRepository.findByWhatsapp(whatsapp);
    }
}