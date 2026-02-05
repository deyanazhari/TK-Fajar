package com.tkfajar.backend.repository;

import com.tkfajar.backend.model.Registration;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

public interface RegistrationRepository {
    
    List<Registration> findAll();
    
    Optional<Registration> findById(Long id);
    
    Optional<Registration> findByWhatsapp(String whatsapp);
    
    boolean existsByWhatsapp(String whatsapp);
    
    Registration save(Registration registration);
}