package com.school_medical.school_medical_management_system.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String sql = "SELECT a.user_id, a.email, a.password, r.role_name FROM AppUser a JOIN Role r ON a.role_id = r.role_id WHERE a.email = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{email}, (rs, rowNum) -> {
                String role = rs.getString("role_name");
                return User.builder()
                        .username(rs.getString("email"))
                        .password(rs.getString("password"))
                        .roles(role)
                        .build();
            });
        } catch (EmptyResultDataAccessException e) {
            throw new UsernameNotFoundException("User not found");
        }
    }
}

