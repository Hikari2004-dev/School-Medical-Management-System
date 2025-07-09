package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IHealthInfoRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class HealthInfoRepository implements IHealthInfoRepository {

    @Autowired
    private DataSource dataSource;

    @Override
    public Healthinfo findByStudentId(int studentId) {
        String sql = "SELECT * FROM HealthInfo WHERE student_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, studentId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Healthinfo info = new Healthinfo();
                    info.setHealthInfoId(rs.getInt("health_info_id"));
                    info.setAllergy(rs.getString("allergy"));
                    info.setChronicDisease(rs.getString("chronic_disease"));
                    info.setVision(rs.getString("vision"));
                    info.setHearing(rs.getString("hearing"));
                    info.setMedicalHistory(rs.getString("medical_history"));
                    info.setHeight(rs.getFloat("height"));
                    info.setWeight(rs.getFloat("weight"));
                    info.setBmi(rs.getFloat("bmi"));
                    info.setStudentId(rs.getInt("student_id"));
                    return info;
                }
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void saveOrUpdate(Healthinfo info) {
        String checkSql = "SELECT COUNT(*) FROM HealthInfo WHERE student_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement checkStmt = conn.prepareStatement(checkSql)) {
            checkStmt.setInt(1, info.getStudentId());
            ResultSet rs = checkStmt.executeQuery();
            rs.next();

            if (rs.getInt(1) > 0) {
                String updateSql = "UPDATE HealthInfo SET allergy=?, chronic_disease=?, vision=?, hearing=?, medical_history=?, height=?, weight=?, bmi=? WHERE student_id=?";
                try (PreparedStatement stmt = conn.prepareStatement(updateSql)) {
                    stmt.setString(1, info.getAllergy());
                    stmt.setString(2, info.getChronicDisease());
                    stmt.setString(3, info.getVision());
                    stmt.setString(4, info.getHearing());
                    stmt.setString(5, info.getMedicalHistory());
                    stmt.setFloat(6, info.getHeight());
                    stmt.setFloat(7, info.getWeight());
                    stmt.setFloat(8, info.getBmi());
                    stmt.setInt(9, info.getStudentId());
                    stmt.executeUpdate();
                }
            } else {
                String insertSql = "INSERT INTO HealthInfo (allergy, chronic_disease, vision, hearing, medical_history, height, weight, bmi, student_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(insertSql)) {
                    stmt.setString(1, info.getAllergy());
                    stmt.setString(2, info.getChronicDisease());
                    stmt.setString(3, info.getVision());
                    stmt.setString(4, info.getHearing());
                    stmt.setString(5, info.getMedicalHistory());
                    stmt.setFloat(6, info.getHeight());
                    stmt.setFloat(7, info.getWeight());
                    stmt.setFloat(8, info.getBmi());
                    stmt.setInt(9, info.getStudentId());
                    stmt.executeUpdate();
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
