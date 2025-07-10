package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.ApprovalRequest;
import com.school_medical.school_medical_management_system.repositories.entites.Medicationsubmission;
import com.school_medical.school_medical_management_system.services.impl.MedicationsubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medication-submissions")
public class MedicationsubmissionController {

    @Autowired
    private MedicationsubmissionService service;

    // Tạo mới MedicationSubmission
    @PostMapping
    public ResponseEntity<String> createSubmission(@RequestBody Medicationsubmission submission) {
        service.save(submission);
        return ResponseEntity.ok("Medication submission saved successfully.");
    }

    // Lấy danh sách submissions theo parent ID
    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<Medicationsubmission>> getSubmissionsByParent(@PathVariable Integer parentId) {
        List<Medicationsubmission> submissions = service.findByParentId(parentId);
        return ResponseEntity.ok(submissions);
    }

    // Lấy submission theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Medicationsubmission> getSubmissionById(@PathVariable Integer id) {
        Medicationsubmission submission = service.findById(id);
        if (submission != null) {
            return ResponseEntity.ok(submission);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<String> approveSubmission(@PathVariable Integer id,
                                                    @RequestBody ApprovalRequest request) {
        service.approveSubmission(id, request.getApprovedBy(), request.getApprovalStatus());
        return ResponseEntity.ok("Submission approved successfully");
    }
}
