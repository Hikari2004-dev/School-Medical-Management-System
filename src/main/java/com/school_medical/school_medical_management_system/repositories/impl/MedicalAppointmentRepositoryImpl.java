package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IMedicalAppointmentRepository;
import com.school_medical.school_medical_management_system.repositories.entites.MedicalAppointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MedicalAppointmentRepositoryImpl implements IMedicalAppointmentRepository {

    @Autowired
    private DataSource dataSource;

    @Override
    public void createAppointment(MedicalAppointment appointment) {
        String sql = "INSERT INTO medicalappointment (student_id, nurse_id, appointment_date, reason, status) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, appointment.getStudentId());
            stmt.setInt(2, appointment.getNurseId());
            stmt.setTimestamp(3, Timestamp.valueOf(appointment.getAppointmentDate()));
            stmt.setString(4, appointment.getReason());
            stmt.setString(5, appointment.getStatus());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error creating appointment", e);
        }
    }

    @Override
    public List<MedicalAppointment> getAppointmentsByStudentId(int studentId) {
        String sql = "SELECT * FROM medicalappointment WHERE student_id = ?";
        List<MedicalAppointment> list = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, studentId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                MedicalAppointment app = new MedicalAppointment();
                app.setAppointmentId(rs.getInt("appointment_id"));
                app.setStudentId(rs.getInt("student_id"));
                app.setNurseId(rs.getInt("nurse_id"));
                app.setAppointmentDate(rs.getTimestamp("appointment_date").toLocalDateTime());
                app.setReason(rs.getString("reason"));
                app.setStatus(rs.getString("status"));
                list.add(app);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error fetching appointments", e);
        }
        return list;
    }

    @Override
    public void approveAppointment(int appointmentId, String status) {
        String sql = "UPDATE medicalappointment SET status = ? WHERE appointment_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, status);
            stmt.setInt(2, appointmentId);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error approving appointment", e);
        }
    }

    @Override
    public List<MedicalAppointment> getAllAppointments() {  // Phương thức mới
        String sql = "SELECT * FROM medicalappointment";
        List<MedicalAppointment> list = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                MedicalAppointment app = new MedicalAppointment();
                app.setAppointmentId(rs.getInt("appointment_id"));
                app.setStudentId(rs.getInt("student_id"));
                app.setNurseId(rs.getInt("nurse_id"));
                app.setAppointmentDate(rs.getTimestamp("appointment_date").toLocalDateTime());
                app.setReason(rs.getString("reason"));
                app.setStatus(rs.getString("status"));
                list.add(app);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error fetching all appointments", e);
        }
        return list;
    }
}
