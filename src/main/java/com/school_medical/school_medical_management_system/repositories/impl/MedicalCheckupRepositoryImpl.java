package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.MedicalCheckupRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Medicalcheckup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class MedicalCheckupRepositoryImpl implements MedicalCheckupRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int createPlan(Medicalcheckup checkup) {
        String sql = "INSERT INTO medicalcheckup (date, description, status, need_follow_up, student_id, created_by_user_id, health_info_id, student_event_id) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                checkup.getDate(),
                checkup.getDescription(),
                "PLANNED",
                checkup.getNeedFollowUp(),
                checkup.getStudent().getId(),
                checkup.getCreatedByUserId(),
                checkup.getHealthInfo().getId(),
                checkup.getStudentEvent() != null ? checkup.getStudentEvent().getId() : null
        );
    }

    @Override
    public int approvePlan(int checkupId) {
        String sql = "UPDATE medicalcheckup SET status = 'APPROVED' WHERE checkup_id = ?";
        return jdbcTemplate.update(sql, checkupId);
    }

    @Override
    public int parentConsent(int studentId, boolean consent) {
        String sql = "UPDATE notification SET confirmed = ? WHERE sent_to_student_id = ?";
        return jdbcTemplate.update(sql, consent, studentId);
    }

    @Override
    public int completeCheckup(int checkupId, Medicalcheckup checkup) {
        String sql = "UPDATE medicalcheckup SET description = ?, status = ?, need_follow_up = ? WHERE checkup_id = ?";
        return jdbcTemplate.update(sql,
                checkup.getDescription(),
                "COMPLETED",
                checkup.getNeedFollowUp(),
                checkupId
        );
    }

    @Override
    public List<Medicalcheckup> findAll() {
        String sql = "SELECT * FROM medicalcheckup";
        return jdbcTemplate.query(sql, this::mapRow);
    }

    @Override
    public Optional<Medicalcheckup> findById(int id) {
        String sql = "SELECT * FROM medicalcheckup WHERE checkup_id = ?";
        List<Medicalcheckup> result = jdbcTemplate.query(sql, this::mapRow, id);
        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    private Medicalcheckup mapRow(ResultSet rs, int rowNum) throws SQLException {
        Medicalcheckup checkup = new Medicalcheckup();
        checkup.setId(rs.getInt("checkup_id"));
        checkup.setDate(rs.getDate("date").toLocalDate());
        checkup.setDescription(rs.getString("description"));
        checkup.setStatus(rs.getString("status"));
        checkup.setNeedFollowUp(rs.getBoolean("need_follow_up"));
        checkup.setCreatedByUserId(rs.getInt("created_by_user_id"));
        // Nếu cần ánh xạ thêm student/healthInfo/studentEvent thì thêm tại đây
        return checkup;
    }
}
