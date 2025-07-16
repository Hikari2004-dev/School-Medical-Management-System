package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IReportRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Report;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

@Repository
public class ReportRepositoryImpl implements IReportRepository {

    private final JdbcTemplate jdbcTemplate;

    public ReportRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void addReport(Report report) {
        String sql = "INSERT INTO mesch.report (report_date, description, user_id) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, report.getReportDate(), report.getDescription(), report.getUserId());
    }

    @Override
    public void updateReport(Report report) {
        String sql = "UPDATE mesch.report SET report_date = ?, description = ?, user_id = ? WHERE report_id = ?";
        int rowsAffected = jdbcTemplate.update(sql, report.getReportDate(), report.getDescription(), report.getUserId(), report.getReportId());
        if (rowsAffected == 0) {
            throw new EmptyResultDataAccessException("No report found with the given ID", 1);
        }
    }

    @Override
    public void deleteReport(int reportId) {
        String sql = "DELETE FROM mesch.report WHERE report_id = ?";
        int rowsAffected = jdbcTemplate.update(sql, reportId);
        if (rowsAffected == 0) {
            throw new EmptyResultDataAccessException("No report found with the given ID", 1);
        }
    }

    @Override
    public Report getReportById(int reportId) {
        String sql = "SELECT * FROM mesch.report WHERE report_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{reportId}, (rs, rowNum) -> {
                Report report = new Report();
                report.setReportId(rs.getInt("report_id"));
                report.setReportDate(rs.getDate("report_date"));
                report.setDescription(rs.getString("description"));
                report.setUserId(rs.getInt("user_id"));
                return report;
            });
        } catch (EmptyResultDataAccessException e) {
            return null; // Trả về null nếu không tìm thấy báo cáo
        }
    }
}
