package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IMedicalCheckupRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Medicalcheckup;
import com.school_medical.school_medical_management_system.repositories.MedicalCheckupImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MedicalCheckupRepositoryImpl implements IMedicalCheckupRepository {

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
                checkup.getStudentEvent().getId()
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
        return jdbcTemplate.query(sql, new MedicalCheckupImpl());
    }

    @Override
    public Optional<Medicalcheckup> findById(int id) {
        String sql = "SELECT * FROM medicalcheckup WHERE checkup_id = ?";
        List<Medicalcheckup> result = jdbcTemplate.query(sql, new MedicalCheckupImpl(), id);
        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }
}
