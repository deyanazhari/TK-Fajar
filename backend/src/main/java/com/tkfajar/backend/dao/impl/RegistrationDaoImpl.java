package com.tkfajar.backend.dao.impl;

import com.tkfajar.backend.dao.RegistrationDao;
import com.tkfajar.backend.model.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Implementation of RegistrationDao using JdbcTemplate
 * Provides direct database access without JPA
 */
@Repository
public class RegistrationDaoImpl implements RegistrationDao {
    
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public RegistrationDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    private final RowMapper<Registration> registrationRowMapper = new RowMapper<Registration>() {
        @Override
        public Registration mapRow(ResultSet rs, int rowNum) throws SQLException {
            Registration registration = new Registration();
            registration.setId(rs.getLong("id"));
            registration.setParentName(rs.getString("parent_name"));
            registration.setChildName(rs.getString("child_name"));
            registration.setWhatsapp(rs.getString("whatsapp"));
            
            // Handle date conversion
            java.sql.Date tanggalLahir = rs.getDate("tanggal_lahir");
            if (tanggalLahir != null) {
                registration.setTanggalLahir(tanggalLahir.toLocalDate());
            }
            
            Timestamp createdAt = rs.getTimestamp("created_at");
            if (createdAt != null) {
                registration.setCreatedAt(createdAt.toLocalDateTime());
            }
            
            registration.setAlamat(rs.getString("alamat"));
            
            return registration;
        }
    };
    
    @Override
    public Registration save(Registration registration) {
        if (registration.getId() == null) {
            // Insert new registration
            String sql = "INSERT INTO registrations (parent_name, child_name, whatsapp, tanggal_lahir, alamat, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
            GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
            
            jdbcTemplate.update(sql, keyHolder,
                registration.getParentName(),
                registration.getChildName(),
                registration.getWhatsapp(),
                registration.getTanggalLahir(),
                registration.getAlamat(),
                Timestamp.valueOf(LocalDateTime.now())
            );
            
            registration.setId(keyHolder.getKey().longValue());
        } else {
            // Update existing registration
            String sql = "UPDATE registrations SET parent_name = ?, child_name = ?, whatsapp = ?, tanggal_lahir = ?, alamat = ? WHERE id = ?";
            jdbcTemplate.update(sql,
                registration.getParentName(),
                registration.getChildName(),
                registration.getWhatsapp(),
                registration.getTanggalLahir(),
                registration.getAlamat(),
                registration.getId()
            );
        }
        return registration;
    }
    
    @Override
    public Optional<Registration> findByWhatsapp(String whatsapp) {
        String sql = "SELECT * FROM registrations WHERE whatsapp = ?";
        List<Registration> registrations = jdbcTemplate.query(sql, registrationRowMapper, whatsapp);
        return registrations.isEmpty() ? Optional.empty() : Optional.of(registrations.get(0));
    }
    
    @Override
    public boolean existsByWhatsapp(String whatsapp) {
        String sql = "SELECT COUNT(*) FROM registrations WHERE whatsapp = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, whatsapp);
        return count != null && count > 0;
    }
    
    @Override
    public Optional<Registration> findById(Long id) {
        String sql = "SELECT * FROM registrations WHERE id = ?";
        List<Registration> registrations = jdbcTemplate.query(sql, registrationRowMapper, id);
        return registrations.isEmpty() ? Optional.empty() : Optional.of(registrations.get(0));
    }
    
    @Override
    public List<Registration> findAll() {
        String sql = "SELECT * FROM registrations ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, registrationRowMapper);
    }
    
    @Override
    public List<Registration> findAll(int page, int size) {
        String sql = "SELECT * FROM registrations ORDER BY created_at DESC LIMIT ? OFFSET ?";
        int offset = page * size;
        return jdbcTemplate.query(sql, registrationRowMapper, size, offset);
    }
    
    @Override
    public long count() {
        String sql = "SELECT COUNT(*) FROM registrations";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }
    
    @Override
    public Registration update(Registration registration) {
        String sql = "UPDATE registrations SET parent_name = ?, child_name = ?, whatsapp = ?, tanggal_lahir = ?, alamat = ? WHERE id = ?";
        jdbcTemplate.update(sql,
            registration.getParentName(),
            registration.getChildName(),
            registration.getWhatsapp(),
            registration.getTanggalLahir(),
            registration.getAlamat(),
            registration.getId()
        );
        return registration;
    }
    
    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM registrations WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
    
    @Override
    public List<Registration> findByParentName(String parentName) {
        String sql = "SELECT * FROM registrations WHERE parent_name LIKE ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, registrationRowMapper, "%" + parentName + "%");
    }
    
    @Override
    public List<Registration> findByChildName(String childName) {
        String sql = "SELECT * FROM registrations WHERE child_name LIKE ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, registrationRowMapper, "%" + childName + "%");
    }
    
    @Override
    public List<Registration> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        String sql = "SELECT * FROM registrations WHERE created_at BETWEEN ? AND ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, registrationRowMapper, Timestamp.valueOf(startDate), Timestamp.valueOf(endDate));
    }
    
    @Override
    public List<Registration> findRecentRegistrations(int days) {
        String sql = "SELECT * FROM registrations WHERE created_at >= datetime('now', '-" + days + " days') ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, registrationRowMapper);
    }
    
    @Override
    public List<Registration> searchRegistrations(String searchTerm) {
        String sql = "SELECT * FROM registrations WHERE parent_name LIKE ? OR child_name LIKE ? OR whatsapp LIKE ? OR alamat LIKE ? ORDER BY created_at DESC";
        String searchPattern = "%" + searchTerm + "%";
        return jdbcTemplate.query(sql, registrationRowMapper, searchPattern, searchPattern, searchPattern, searchPattern);
    }
    
    @Override
    public Map<String, Object> getRegistrationStatistics() {
        Map<String, Object> stats = Map.of(
            "total", count(),
            "recent30Days", findRecentRegistrations(30).size(),
            "recent7Days", findRecentRegistrations(7).size(),
            "today", findRecentRegistrations(1).size()
        );
        return stats;
    }
}