package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.repositories.ProvidedServiceLogRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Providedservicelog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medication")
@CrossOrigin(origins = "*")
public class ProvidedServiceLogController {

    @Autowired
    private ProvidedServiceLogRepository providedServiceLogRepository;

    // Parent gửi yêu cầu thuốc
    @PostMapping("/request")
    public ResponseEntity<String> createRequest(@RequestBody Providedservicelog log) {
        int result = providedServiceLogRepository.createMedicationRequest(log);
        if (result > 0) {
            return ResponseEntity.ok("Đã gửi đơn thuốc");
        }
        return ResponseEntity.badRequest().body("Gửi đơn thất bại");
    }

    // Nurse xác nhận đơn thuốc
    @PutMapping("/confirm/{id}")
    public ResponseEntity<String> confirmRequest(@PathVariable int id, @RequestParam int nurseId) {
        int result = providedServiceLogRepository.confirmMedicationRequest(id, nurseId);
        if (result > 0) {
            return ResponseEntity.ok("Đã xác nhận đơn thuốc");
        }
        return ResponseEntity.status(404).body("Không tìm thấy đơn thuốc");
    }

    // Lấy một đơn thuốc
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        return providedServiceLogRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Không tìm thấy đơn thuốc"));
    }

    // Lấy tất cả đơn thuốc
    @GetMapping
    public ResponseEntity<List<Providedservicelog>> getAll() {
        List<Providedservicelog> logs = providedServiceLogRepository.findAll();
        return ResponseEntity.ok(logs);
    }
}
