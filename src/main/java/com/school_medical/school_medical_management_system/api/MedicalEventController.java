package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.ApiResponse;
import com.school_medical.school_medical_management_system.models.ApprovalRequest;
import com.school_medical.school_medical_management_system.models.MedicalEventDTO;
import com.school_medical.school_medical_management_system.services.IMedicalEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-events")
public class MedicalEventController {

    @Autowired
    private IMedicalEventService medicalEventService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MedicalEventDTO>>> getAllMedicalEvents() {
        try {
            List<MedicalEventDTO> events = medicalEventService.getAllEvents();
            return ResponseEntity.ok(new ApiResponse<>(true, "Lấy danh sách sự kiện thành công", events));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi hệ thống: " + e.getMessage(), null));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MedicalEventDTO>> createMedicalEvent(@RequestBody MedicalEventDTO eventDTO) {
        try {
            MedicalEventDTO createdEvent = medicalEventService.createEvent(eventDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Tạo sự kiện thành công", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Tạo thất bại: " + e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicalEventDTO>> updateMedicalEvent(@PathVariable Long id, @RequestBody MedicalEventDTO eventDTO) {
        try {
            MedicalEventDTO updatedEvent = medicalEventService.updateEvent(id, eventDTO);
            return ResponseEntity.ok(new ApiResponse<>(true, "Cập nhật thành công", updatedEvent));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Cập nhật thất bại: " + e.getMessage(), null));
        }
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<MedicalEventDTO>> approveMedicalEvent(@PathVariable Long id, @RequestBody ApprovalRequest approvalRequest) {
        try {
            MedicalEventDTO approvedEvent = medicalEventService.approveEvent(id, approvalRequest);
            return ResponseEntity.ok(new ApiResponse<>(true, "Phê duyệt thành công", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Phê duyệt thất bại: " + e.getMessage(), null));
        }
    }
}
