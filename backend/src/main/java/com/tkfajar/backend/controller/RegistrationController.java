package com.tkfajar.backend.controller;

import com.tkfajar.backend.dto.RegistrationRequest;
import com.tkfajar.backend.dto.RegistrationResponse;
import com.tkfajar.backend.model.Registration;
import com.tkfajar.backend.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

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
                null, null, null, null, null, null, null,null,null,null,null,e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        List<Registration> registrations = registrationService.getAllRegistrations();
        return ResponseEntity.ok(registrations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRegistration(@PathVariable Long id) {
        boolean deleted = registrationService.deleteRegistration(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Data pendaftaran berhasil dihapus"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping
    public ResponseEntity<Map<String, Object>> deleteAllRegistrations() {
        registrationService.deleteAllRegistrations();
        return ResponseEntity.ok(Map.of("success", true, "message", "Semua data pendaftaran berhasil dihapus"));
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "OK", "message", "TK Fajar API is running"));
    }
    
    @GetMapping("/")
    public ResponseEntity<Map<String, String>> rootHealth() {
        return ResponseEntity.ok(Map.of("status", "OK", "message", "TK Fajar Backend - System Ready", "timestamp", java.time.LocalDateTime.now().toString()));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}