package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements IUserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UserDetails findUserByEmail(String email) {
        String sql = "SELECT a.user_id, a.email, a.password, r.role_name " +
                "FROM AppUser a JOIN Role r ON a.role_id = r.role_id " +
                "WHERE a.email = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{email}, (rs, rowNum) -> {
                String role = rs.getString("role_name");
                // .roles() tự động thêm tiền tố ROLE_, nhưng role_name trong DB phải là UPPERCASE không có tiền tố
                return User.builder()
                        .username(rs.getString("email"))
                        .password(rs.getString("password"))
                        .roles(role.toUpperCase())
                        .build();
            });
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
