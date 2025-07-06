package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Medicalcheckup;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class MedicalCheckupImpl implements RowMapper<Medicalcheckup> {
    @Override
    public Medicalcheckup mapRow(ResultSet rs, int rowNum) throws SQLException {
        Medicalcheckup checkup = new Medicalcheckup();
        checkup.setId(rs.getInt("checkup_id"));
        checkup.setDate(rs.getObject("date", LocalDate.class));
        checkup.setDescription(rs.getString("description"));
        checkup.setStatus(rs.getString("status"));
        checkup.setNeedFollowUp(rs.getBoolean("need_follow_up"));
        checkup.setCreatedByUserId(rs.getInt("created_by_user_id"));
        // Bạn có thể set thêm Student, HealthInfo, StudentEvent nếu cần
        return checkup;
    }
}
