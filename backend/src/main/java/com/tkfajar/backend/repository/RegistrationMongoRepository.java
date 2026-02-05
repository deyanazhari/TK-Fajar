package com.tkfajar.backend.repository;

import com.tkfajar.backend.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationMongoRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByWhatsapp(String whatsapp);
    boolean existsByWhatsapp(String whatsapp);
}