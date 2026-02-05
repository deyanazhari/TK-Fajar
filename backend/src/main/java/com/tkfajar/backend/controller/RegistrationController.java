package com.tkfajar.backend.controller;

import com.tkfajar.backend.dto.RegistrationRequest;
import com.tkfajar.backend.dto.RegistrationResponse;
import com.tkfajar.backend.model.Registration;
import com.tkfajar.backend.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class RegistrationController {
    
    private final RegistrationService registrationService;
    
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }
    
    @PostMapping
    public ResponseEntity<RegistrationResponse> submitRegistration(@Valid @RequestBody RegistrationRequest request) {
        try {
            //API submit pendaftaran
            RegistrationResponse response = registrationService.submitRegistration(request);
            System.out.println("New registration submitted: " + request.getParentName());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            System.err.println("Error submitting registration: " + e.getMessage());
            RegistrationResponse errorResponse = new RegistrationResponse(
                null, null, null, null, null, null, null, e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<com.tkfajar.backend.model.Registration>> getAllRegistrations() {
        List<com.tkfajar.backend.model.Registration> registrations = registrationService.getAllRegistrations();
        return ResponseEntity.ok(registrations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<com.tkfajar.backend.model.Registration> getRegistrationById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "OK", "message", "TK Fajar API is running"));
    }
    
    @GetMapping("/")
    public ResponseEntity<Map<String, String>> rootHealth() {
        return ResponseEntity.ok(Map.of("status", "OK", "message", "TK Fajar Backend - System Ready", "timestamp", java.time.LocalDateTime.now().toString()));
    }
}