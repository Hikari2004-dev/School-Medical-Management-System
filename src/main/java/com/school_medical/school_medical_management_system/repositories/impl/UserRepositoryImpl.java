package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IUserRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Repository
public class UserRepositoryImpl implements IUserRepository {

    @Autowired
    private DataSource dataSource;

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
        String sql = "SELECT user_id,first_name,last_name,email,phone,address,role_name \n" +
                "FROM appuser \n" +
                "JOIN role on appuser.role_id = role.role_id\n" +
                "WHERE email = ?";
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
                    return user;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
