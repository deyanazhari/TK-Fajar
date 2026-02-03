package com.tkceriamandiri.backend.controller;

import com.tkceriamandiri.backend.dto.RegistrationRequest;
import com.tkceriamandiri.backend.dto.RegistrationResponse;
import com.tkceriamandiri.backend.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/registration")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class RegistrationController {
    
    private final RegistrationService registrationService;
    
    @PostMapping
    public ResponseEntity<RegistrationResponse> submitRegistration(@Valid @RequestBody RegistrationRequest request) {
        try {
            RegistrationResponse response = registrationService.submitRegistration(request);
            log.info("New registration submitted: {}", request.getParentName());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            log.error("Error submitting registration: {}", e.getMessage());
            RegistrationResponse errorResponse = new RegistrationResponse(
                null, null, null, null, null, e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<com.tkceriamandiri.backend.model.Registration>> getAllRegistrations() {
        List<com.tkceriamandiri.backend.model.Registration> registrations = registrationService.getAllRegistrations();
        return ResponseEntity.ok(registrations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<com.tkceriamandiri.backend.model.Registration> getRegistrationById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "OK", "message", "TK Ceria Mandiri API is running"));
    }
}