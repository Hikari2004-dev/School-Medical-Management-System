package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.repositories.entites.Report;

public interface IReportService {
    void saveReport(Report report);  // Thêm báo cáo
    void modifyReport(Report report);  // Sửa báo cáo
    void removeReport(int reportId);  // Xóa báo cáo
    Report getReport(int reportId);  // Lấy báo cáo theo ID
}
