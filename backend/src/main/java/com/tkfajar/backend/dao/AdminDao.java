package com.tkfajar.backend.dao;

import com.tkfajar.backend.model.Admin;
import java.util.Optional;

/**
 * Data Access Object for Admin entity
 * Provides a clean interface for database operations
 */
public interface AdminDao {
    
    /**
     * Save an admin to the database
     * @param admin the admin to save
     * @return the saved admin with generated ID
     */
    Admin save(Admin admin);
    
    /**
     * Find an admin by username
     * @param username the username to search for
     * @return Optional containing the admin if found
     */
    Optional<Admin> findByUsername(String username);
    
    /**
     * Check if an admin exists by username
     * @param username the username to check
     * @return true if admin exists, false otherwise
     */
    boolean existsByUsername(String username);
    
    /**
     * Find an admin by ID
     * @param id the admin ID
     * @return Optional containing the admin if found
     */
    Optional<Admin> findById(Long id);
    
    /**
     * Find all admins
     * @return list of all admins
     */
    java.util.List<Admin> findAll();
    
    /**
     * Update an admin
     * @param admin the admin to update
     * @return the updated admin
     */
    Admin update(Admin admin);
    
    /**
     * Delete an admin by ID
     * @param id the admin ID to delete
     */
    void deleteById(Long id);
    
    /**
     * Count total number of admins
     * @return total count of admins
     */
    long count();
    
    /**
     * Find admins by role
     * @param role the role to filter by
     * @return list of admins with the specified role
     */
    java.util.List<Admin> findByRole(String role);
    
    /**
     * Update last login timestamp for an admin
     * @param adminId the admin ID
     * @param loginTime the login timestamp
     */
    void updateLastLogin(Long adminId, java.time.LocalDateTime loginTime);
    
    /**
     * Activate/deactivate an admin
     * @param adminId the admin ID
     * @param active the active status
     */
    void updateActiveStatus(Long adminId, boolean active);
}