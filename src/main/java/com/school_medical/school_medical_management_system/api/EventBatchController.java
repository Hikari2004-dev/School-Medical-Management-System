package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.ApiResponse;
import com.school_medical.school_medical_management_system.repositories.entites.EventBatch;
import com.school_medical.school_medical_management_system.services.IEventBatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event-batches")
public class EventBatchController {

    @Autowired
    private IEventBatchService eventBatchService;

    /**
     * Lấy danh sách tất cả các Event Batch
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<EventBatch>>> getAllEventBatches() {
        try {
            List<EventBatch> batches = eventBatchService.getAllBatches();
            return ResponseEntity.ok(new ApiResponse<>(true, "Lấy danh sách batch thành công", batches));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi hệ thống: " + e.getMessage(), null));
        }
    }

    /**
     * Lấy chi tiết Event Batch theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventBatch>> getEventBatchById(@PathVariable Integer id) {
        try {
            EventBatch batch = eventBatchService.getBatchById(id);
            if (batch != null) {
                return ResponseEntity.ok(new ApiResponse<>(true, "Lấy chi tiết batch thành công", batch));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>(false, "Không tìm thấy batch với ID: " + id, null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi hệ thống: " + e.getMessage(), null));
        }
    }

    /**
     * Tạo mới Event Batch
     */
    @PostMapping
    public ResponseEntity<ApiResponse<EventBatch>> createEventBatch(@RequestBody EventBatch batch) {
        try {
            eventBatchService.createBatch(batch);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Tạo batch thành công", batch));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Tạo batch thất bại: " + e.getMessage(), null));
        }
    }

    /**
     * Phê duyệt Event Batch theo ID
     */
    @PostMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<String>> approveEventBatch(@PathVariable Integer id) {
        try {
            eventBatchService.approveBatch(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Phê duyệt batch thành công", "Batch ID " + id + " đã được phê duyệt"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Phê duyệt thất bại: " + e.getMessage(), null));
        }
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventBatch>> getTop3UpcomingEvents() {
        List<EventBatch> events = eventBatchService.getTop3UpcomingEvents();
        return events.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(events);
    }
}
