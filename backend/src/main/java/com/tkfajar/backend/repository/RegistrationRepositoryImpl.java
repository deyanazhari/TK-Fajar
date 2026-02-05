package com.tkfajar.backend.repository;

import com.tkfajar.backend.model.Registration;
import org.springframework.stereotype.Repository;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class RegistrationRepositoryImpl implements RegistrationRepository {
    
    private final Map<Long, Registration> database = new ConcurrentHashMap<>();
    private Long nextId = 1L;
    
    @Override
    public List<Registration> findAll() {
        return new ArrayList<>(database.values());
    }
    
    @Override
    public Optional<Registration> findById(Long id) {
        return Optional.ofNullable(database.get(id));
    }
    
    @Override
    public Optional<Registration> findByWhatsapp(String whatsapp) {
        return database.values().stream()
                .filter(reg -> reg.getWhatsapp().equals(whatsapp))
                .findFirst();
    }
    
    @Override
    public boolean existsByWhatsapp(String whatsapp) {
        return database.values().stream()
                .anyMatch(reg -> reg.getWhatsapp().equals(whatsapp));
    }
    
    @Override
    public Registration save(Registration registration) {
        if (registration.getId() == null) {
            registration.setId(nextId++);
        }
        database.put(registration.getId(), registration);
        return registration;
    }
}