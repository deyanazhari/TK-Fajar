package com.tkfajar.backend.dao;

import com.tkfajar.backend.model.Registration;
import java.util.Optional;

/**
 * Data Access Object for Registration entity
 * Provides a clean interface for database operations
 */
public interface RegistrationDao {
    
    /**
     * Save a registration to the database
     * @param registration the registration to save
     * @return the saved registration with generated ID
     */
    Registration save(Registration registration);
    
    /**
     * Find a registration by WhatsApp number
     * @param whatsapp the WhatsApp number to search for
     * @return Optional containing the registration if found
     */
    Optional<Registration> findByWhatsapp(String whatsapp);
    
    /**
     * Check if a registration exists by WhatsApp number
     * @param whatsapp the WhatsApp number to check
     * @return true if registration exists, false otherwise
     */
    boolean existsByWhatsapp(String whatsapp);
    
    /**
     * Find a registration by ID
     * @param id the registration ID
     * @return Optional containing the registration if found
     */
    Optional<Registration> findById(Long id);
    
    /**
     * Find all registrations
     * @return list of all registrations
     */
    java.util.List<Registration> findAll();
    
    /**
     * Find registrations with pagination
     * @param page page number (0-based)
     * @param size page size
     * @return list of registrations for the specified page
     */
    java.util.List<Registration> findAll(int page, int size);
    
    /**
     * Count total number of registrations
     * @return total count of registrations
     */
    long count();
    
    /**
     * Update a registration
     * @param registration the registration to update
     * @return the updated registration
     */
    Registration update(Registration registration);
    
    /**
     * Delete a registration by ID
     * @param id the registration ID to delete
     */
    void deleteById(Long id);
    
    /**
     * Find registrations by parent name
     * @param parentName the parent name to search for
     * @return list of registrations matching the parent name
     */
    java.util.List<Registration> findByParentName(String parentName);
    
    /**
     * Find registrations by child name
     * @param childName the child name to search for
     * @return list of registrations matching the child name
     */
    java.util.List<Registration> findByChildName(String childName);
    
    /**
     * Find registrations by date range
     * @param startDate the start date
     * @param endDate the end date
     * @return list of registrations within the date range
     */
    java.util.List<Registration> findByDateRange(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
    
    /**
     * Find recent registrations within the last N days
     * @param days number of days to look back
     * @return list of recent registrations
     */
    java.util.List<Registration> findRecentRegistrations(int days);
    
    /**
     * Search registrations by multiple criteria
     * @param searchTerm the search term
     * @return list of registrations matching the search criteria
     */
    java.util.List<Registration> searchRegistrations(String searchTerm);
    
    /**
     * Get registration statistics
     * @return map containing various statistics
     */
    java.util.Map<String, Object> getRegistrationStatistics();
}