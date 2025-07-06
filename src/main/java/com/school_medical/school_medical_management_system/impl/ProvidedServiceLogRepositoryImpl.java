package com.school_medical.school_medical_management_system.impl;

import com.school_medical.school_medical_management_system.repositories.ProvidedServiceLogRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Providedservicelog;
import com.school_medical.school_medical_management_system.repositories.ProvidedServiceLogImpl; // ✅ đúng package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProvidedServiceLogRepositoryImpl implements ProvidedServiceLogRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int createMedicationRequest(Providedservicelog log) {
        String sql = """
                INSERT INTO providedservicelog (name_type, parent_id, student_id, status, timestamp)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
                """;
        return jdbcTemplate.update(sql,
                log.getNameType(),
                log.getParent() != null ? log.getParent().getId() : null,
                log.getStudentId(),
                "PENDING"
        );
    }

    @Override
    public int confirmMedicationRequest(int logId, int nurseId) {
        String sql = """
                UPDATE providedservicelog
                SET nurse_id = ?, status = ?
                WHERE provided_service_log_id = ?
                """;
        return jdbcTemplate.update(sql, nurseId, "CONFIRMED", logId);
    }

    @Override
    public Optional<Providedservicelog> findById(int id) {
        String sql = "SELECT * FROM providedservicelog WHERE provided_service_log_id = ?";
        List<Providedservicelog> result = jdbcTemplate.query(sql, new ProvidedServiceLogImpl(), id);
        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    @Override
    public List<Providedservicelog> findAll() {
        String sql = "SELECT * FROM providedservicelog";
        return jdbcTemplate.query(sql, new ProvidedServiceLogImpl());
    }
}
