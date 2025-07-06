package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Providedservicelog;
import com.school_medical.school_medical_management_system.repositories.entites.Parent;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProvidedServiceLogImpl implements RowMapper<Providedservicelog> {

    @Override
    public Providedservicelog mapRow(ResultSet rs, int rowNum) throws SQLException {
        Providedservicelog log = new Providedservicelog();

        log.setId(rs.getInt("provided_service_log_id"));
        log.setTimestamp(rs.getTimestamp("timestamp").toInstant());
        log.setNameType(rs.getString("name_type"));
        log.setStudentId(rs.getInt("student_id"));
        log.setStatus(rs.getString("status"));

        // Xử lý nurse_id nullable
        int nurseId = rs.getInt("nurse_id");
        if (!rs.wasNull()) {
            log.setNurseId(nurseId);
        } else {
            log.setNurseId(null);
        }

        // Xử lý parent_id nullable
        int parentId = rs.getInt("parent_id");
        if (!rs.wasNull()) {
            Parent parent = new Parent();
            parent.setId(parentId);
            log.setParent(parent);
        } else {
            log.setParent(null);
        }

        return log;
    }
}
