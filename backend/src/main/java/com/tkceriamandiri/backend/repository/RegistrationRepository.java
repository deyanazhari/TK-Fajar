package com.tkceriamandiri.backend.repository;

import com.tkceriamandiri.backend.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByWhatsapp(String whatsapp);
    boolean existsByWhatsapp(String whatsapp);
}