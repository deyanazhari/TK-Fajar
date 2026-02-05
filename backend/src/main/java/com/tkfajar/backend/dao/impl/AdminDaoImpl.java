package com.tkfajar.backend.dao.impl;

import com.tkfajar.backend.dao.AdminDao;
import com.tkfajar.backend.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

/**
 * Implementation of AdminDao using JdbcTemplate
 * Provides direct database access without JPA
 */
@Repository
public class AdminDaoImpl implements AdminDao {
    
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public AdminDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    private final RowMapper<Admin> adminRowMapper = new RowMapper<Admin>() {
        @Override
        public Admin mapRow(ResultSet rs, int rowNum) throws SQLException {
            Admin admin = new Admin();
            admin.setId(rs.getLong("id"));
            admin.setUsername(rs.getString("username"));
            admin.setPassword(rs.getString("password"));
            admin.setRole(rs.getString("role"));
            admin.setActive(rs.getBoolean("active"));
            
            Timestamp createdAt = rs.getTimestamp("created_at");
            if (createdAt != null) {
                admin.setCreatedAt(createdAt.toLocalDateTime());
            }
            
            Timestamp lastLogin = rs.getTimestamp("last_login");
            if (lastLogin != null) {
                admin.setLastLogin(lastLogin.toLocalDateTime());
            }
            
            return admin;
        }
    };
    
    @Override
    public Admin save(Admin admin) {
        if (admin.getId() == null) {
            // Insert new admin
            String sql = "INSERT INTO admins (username, password, role, active, created_at, last_login) VALUES (?, ?, ?, ?, ?, ?)";
            GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
            
            jdbcTemplate.update(sql, keyHolder,
                admin.getUsername(),
                admin.getPassword(),
                admin.getRole(),
                admin.isActive(),
                admin.getCreatedAt() != null ? Timestamp.valueOf(admin.getCreatedAt()) : Timestamp.valueOf(LocalDateTime.now()),
                admin.getLastLogin() != null ? Timestamp.valueOf(admin.getLastLogin()) : null
            );
            
            admin.setId(keyHolder.getKey().longValue());
        } else {
            // Update existing admin
            String sql = "UPDATE admins SET username = ?, password = ?, role = ?, active = ?, last_login = ? WHERE id = ?";
            jdbcTemplate.update(sql,
                admin.getUsername(),
                admin.getPassword(),
                admin.getRole(),
                admin.isActive(),
                admin.getLastLogin() != null ? Timestamp.valueOf(admin.getLastLogin()) : null,
                admin.getId()
            );
        }
        return admin;
    }
    
    @Override
    public Optional<Admin> findByUsername(String username) {
        String sql = "SELECT * FROM admins WHERE username = ?";
        List<Admin> admins = jdbcTemplate.query(sql, adminRowMapper, username);
        return admins.isEmpty() ? Optional.empty() : Optional.of(admins.get(0));
    }
    
    @Override
    public boolean existsByUsername(String username) {
        String sql = "SELECT COUNT(*) FROM admins WHERE username = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, username);
        return count != null && count > 0;
    }
    
    @Override
    public Optional<Admin> findById(Long id) {
        String sql = "SELECT * FROM admins WHERE id = ?";
        List<Admin> admins = jdbcTemplate.query(sql, adminRowMapper, id);
        return admins.isEmpty() ? Optional.empty() : Optional.of(admins.get(0));
    }
    
    @Override
    public List<Admin> findAll() {
        String sql = "SELECT * FROM admins ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, adminRowMapper);
    }
    
    @Override
    public Admin update(Admin admin) {
        String sql = "UPDATE admins SET username = ?, password = ?, role = ?, active = ?, last_login = ? WHERE id = ?";
        jdbcTemplate.update(sql,
            admin.getUsername(),
            admin.getPassword(),
            admin.getRole(),
            admin.isActive(),
            admin.getLastLogin() != null ? Timestamp.valueOf(admin.getLastLogin()) : null,
            admin.getId()
        );
        return admin;
    }
    
    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM admins WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
    
    @Override
    public long count() {
        String sql = "SELECT COUNT(*) FROM admins";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }
    
    @Override
    public List<Admin> findByRole(String role) {
        String sql = "SELECT * FROM admins WHERE role = ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, adminRowMapper, role);
    }
    
    @Override
    public void updateLastLogin(Long adminId, LocalDateTime loginTime) {
        String sql = "UPDATE admins SET last_login = ? WHERE id = ?";
        jdbcTemplate.update(sql, Timestamp.valueOf(loginTime), adminId);
    }
    
    @Override
    public void updateActiveStatus(Long adminId, boolean active) {
        String sql = "UPDATE admins SET active = ? WHERE id = ?";
        jdbcTemplate.update(sql, active, adminId);
    }
}