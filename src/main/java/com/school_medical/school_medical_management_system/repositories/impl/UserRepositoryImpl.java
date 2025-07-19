package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IUserRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements IUserRepository {

    @Autowired
    private DataSource dataSource;

    private final JdbcTemplate jdbcTemplate;

    public UserRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserDetails findUserByEmail(String email) {
        String sql = "SELECT a.user_id, a.email, a.password, r.role_name " +
                "FROM appuser a JOIN role r ON a.role_id = r.role_id " +
                "WHERE a.email = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    String role = rs.getString("role_name");
                    return User.builder()
                            .username(rs.getString("email"))
                            .password(rs.getString("password"))
                            .roles(role.toUpperCase())
                            .build();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Appuser getUserByEmail(String email) {
        String sql = "SELECT user_id, first_name, last_name, email, phone, address, role_name, created_at " +
                "FROM appuser JOIN role ON appuser.role_id = role.role_id WHERE email = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Appuser user = new Appuser();
                    user.setId(rs.getInt("user_id"));
                    user.setFirstName(rs.getString("first_name"));
                    user.setLastName(rs.getString("last_name"));
                    user.setEmail(rs.getString("email"));
                    user.setPhone(rs.getString("phone"));
                    user.setAddress(rs.getString("address"));
                    user.setRoleName(rs.getString("role_name"));
                    user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime()); // ✅ Mới
                    return user;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Optional<Appuser> findByAccountNumber(String accountNumber) {
        String sql = "SELECT * FROM appuser WHERE user_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, accountNumber);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Appuser user = new Appuser();
                user.setId(rs.getInt("user_id"));
                user.setFirstName(rs.getString("first_name"));
                user.setLastName(rs.getString("last_name"));
                user.setEmail(rs.getString("email"));
                user.setPhone(rs.getString("phone"));
                user.setAddress(rs.getString("address"));
                user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime()); // ✅ Mới
                return Optional.of(user);
            }

            return Optional.empty();

        } catch (SQLException e) {
            throw new RuntimeException("Error querying user by account number", e);
        }
    }

    @Override
    public List<Appuser> getAllNurses() {
        String sql = "SELECT a.user_id, a.first_name, a.last_name, a.email, a.phone, a.address, r.role_name " +
                "FROM appuser a JOIN role r ON a.role_id = r.role_id " +
                "WHERE a.role_id = 3";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            List<Appuser> nurses = new java.util.ArrayList<>();
            while (rs.next()) {
                Appuser user = new Appuser();
                user.setId(rs.getInt("user_id"));
                user.setFirstName(rs.getString("first_name"));
                user.setLastName(rs.getString("last_name"));
                user.setEmail(rs.getString("email"));
                user.setPhone(rs.getString("phone"));
                user.setAddress(rs.getString("address"));
                user.setRoleName(rs.getString("role_name"));
                // Không set createdAt vì bạn muốn ẩn
                nurses.add(user);
            }
            return nurses;

        } catch (SQLException e) {
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }

    @Override
    public List<String> getAllUserEmails() {
        String sql = "SELECT email FROM appuser";
        return jdbcTemplate.queryForList(sql, String.class);
    }


    @Override
    public List<Appuser> getAllUsers() {
        String sql = "SELECT user_id, first_name, last_name, email, phone, address, role_name, created_at " +
                "FROM appuser JOIN role ON appuser.role_id = role.role_id";

        List<Appuser> users = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Appuser user = new Appuser();
                user.setId(rs.getInt("user_id"));
                user.setFirstName(rs.getString("first_name"));
                user.setLastName(rs.getString("last_name"));
                user.setEmail(rs.getString("email"));
                user.setPhone(rs.getString("phone"));
                user.setAddress(rs.getString("address"));
                user.setRoleName(rs.getString("role_name"));
                user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                users.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return users;
    }
}
