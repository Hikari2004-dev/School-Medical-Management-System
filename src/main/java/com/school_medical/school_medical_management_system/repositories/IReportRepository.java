package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Report;

public interface IReportRepository {
    void addReport(Report report);  // Thêm báo cáo
    void updateReport(Report report);  // Cập nhật báo cáo
    void deleteReport(int reportId);  // Xóa báo cáo
    Report getReportById(int reportId);  // Lấy báo cáo theo ID
}
