package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.repositories.entites.Report;
import com.school_medical.school_medical_management_system.services.IReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final IReportService reportService;

    @Autowired
    public ReportController(IReportService reportService) {
        this.reportService = reportService;
    }

    // Thêm báo cáo
    @PostMapping("/add")
    public ResponseEntity<String> addReport(@RequestBody Report report) {
        reportService.saveReport(report);
        // In ra thông báo khi thêm báo cáo thành công
        System.out.println("Report added successfully: " + report.getReportId());
        return ResponseEntity.status(201).body("Report added successfully");
    }

    // Cập nhật báo cáo
    @PutMapping("/update")
    public ResponseEntity<String> updateReport(@RequestBody Report report) {
        try {
            // Kiểm tra xem báo cáo có tồn tại không
            reportService.modifyReport(report);
            return ResponseEntity.ok("Report updated successfully");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(404).body("Report not found for update");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReport(@PathVariable int id) {
        try {
            // Kiểm tra xem báo cáo có tồn tại không
            reportService.removeReport(id);
            return ResponseEntity.ok("Report deleted successfully");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(404).body("Report not found for deletion");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getReport(@PathVariable int id) {
        Report report = reportService.getReport(id);

        if (report == null) {
            // Trả về thông báo nếu không tìm thấy báo cáo
            return ResponseEntity.status(404).body("Report not found for ID: " + id);
        }

        // Trả về thông báo và báo cáo nếu tìm thấy
        return ResponseEntity.ok("Report found for ID: " + id + " - " + report);
    }
}