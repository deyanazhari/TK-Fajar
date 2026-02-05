package com.tkfajar.backend.service;

import com.tkfajar.backend.dao.RegistrationDao;
import com.tkfajar.backend.dto.RegistrationRequest;
import com.tkfajar.backend.dto.RegistrationResponse;
import com.tkfajar.backend.model.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for Registration operations using DAO pattern
 * Provides business logic and data transformation
 */
@Service
public class RegistrationDaoService {
    
    private final RegistrationDao registrationDao;
    
    @Autowired
    public RegistrationDaoService(RegistrationDao registrationDao) {
        this.registrationDao = registrationDao;
    }
    
    /**
     * Submit a new registration
     */
    public RegistrationResponse submitRegistration(RegistrationRequest request) {
        // Check if WhatsApp already exists
        if (registrationDao.existsByWhatsapp(request.getWhatsapp())) {
            RegistrationResponse response = new RegistrationResponse();
            response.setSuccess(false);
            response.setMessage("Nomor WhatsApp sudah terdaftar");
            return response;
        }
        
        // Create registration entity
        Registration registration = new Registration();
        registration.setParentName(request.getParentName());
        registration.setChildName(request.getChildName());
        registration.setWhatsapp(request.getWhatsapp());
        registration.setTanggalLahir(request.getTanggalLahir());
        registration.setAlamat(request.getAlamat());
        registration.setCreatedAt(LocalDateTime.now());
        
        // Save registration
        Registration savedRegistration = registrationDao.save(registration);
        
        // Return response
        RegistrationResponse response = new RegistrationResponse();
        response.setSuccess(true);
        response.setId(savedRegistration.getId());
        response.setParentName(savedRegistration.getParentName());
        response.setChildName(savedRegistration.getChildName());
        response.setWhatsapp(savedRegistration.getWhatsapp());
        response.setAlamat(savedRegistration.getAlamat());
        response.setTanggalLahir(savedRegistration.getTanggalLahir());
        response.setCreatedAt(savedRegistration.getCreatedAt());
        response.setMessage("Pendaftaran berhasil");
        return response;
    }
    
    /**
     * Get all registrations
     */
    public List<Registration> getAllRegistrations() {
        return registrationDao.findAll();
    }
    
    /**
     * Get registration by ID
     */
    public Optional<Registration> getRegistrationById(Long id) {
        return registrationDao.findById(id);
    }
    
    /**
     * Get paginated registrations
     */
    public List<Registration> getRegistrationsPaginated(int page, int size) {
        return registrationDao.findAll(page, size);
    }
    
    /**
     * Get registration count
     */
    public long getRegistrationCount() {
        return registrationDao.count();
    }
    
    /**
     * Update registration
     */
    public Registration updateRegistration(Registration registration) {
        return registrationDao.update(registration);
    }
    
    /**
     * Delete registration
     */
    public boolean deleteRegistration(Long id) {
        Optional<Registration> registrationOpt = registrationDao.findById(id);
        if (registrationOpt.isPresent()) {
            registrationDao.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Search registrations
     */
    public List<Registration> searchRegistrations(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return registrationDao.findAll();
        }
        return registrationDao.searchRegistrations(searchTerm);
    }
    
    /**
     * Get registrations by parent name
     */
    public List<Registration> getRegistrationsByParentName(String parentName) {
        return registrationDao.findByParentName(parentName);
    }
    
    /**
     * Get registrations by child name
     */
    public List<Registration> getRegistrationsByChildName(String childName) {
        return registrationDao.findByChildName(childName);
    }
    
    /**
     * Get recent registrations
     */
    public List<Registration> getRecentRegistrations(int days) {
        return registrationDao.findRecentRegistrations(days);
    }
    
    /**
     * Get registration statistics
     */
    public java.util.Map<String, Object> getRegistrationStatistics() {
        return registrationDao.getRegistrationStatistics();
    }
}