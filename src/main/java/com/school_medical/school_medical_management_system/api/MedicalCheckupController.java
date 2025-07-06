package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.repositories.MedicalCheckupRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Medicalcheckup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medical-checkups")
@CrossOrigin(origins = "*")
public class MedicalCheckupController {

    @Autowired
    private MedicalCheckupRepository repository;

    // ✅ Step 1: SchoolNurse lập kế hoạch khám
    @PostMapping("/plan")
    public ResponseEntity<?> createPlan(@RequestBody Medicalcheckup checkup) {
        int result = repository.createPlan(checkup);
        return result > 0 ?
                ResponseEntity.ok("Kế hoạch khám sức khỏe đã được tạo") :
                ResponseEntity.badRequest().body("Tạo kế hoạch thất bại");
    }

    // ✅ Step 2: Headmaster duyệt
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approvePlan(@PathVariable int id) {
        int result = repository.approvePlan(id);
        return result > 0 ?
                ResponseEntity.ok("Đã duyệt kế hoạch") :
                ResponseEntity.status(404).body("Không tìm thấy kế hoạch");
    }

    // ✅ Step 3: Parent đồng ý/không đồng ý cho khám
    @PutMapping("/consent/{studentId}")
    public ResponseEntity<?> parentConsent(@PathVariable int studentId,
                                           @RequestParam boolean consent) {
        int result = repository.parentConsent(studentId, consent);
        return result > 0 ?
                ResponseEntity.ok("Đã ghi nhận phản hồi của phụ huynh") :
                ResponseEntity.badRequest().body("Không thể cập nhật phản hồi");
    }

    // ✅ Step 4: Nurse hoàn tất khám
    @PutMapping("/complete/{id}")
    public ResponseEntity<?> completeCheckup(@PathVariable int id,
                                             @RequestBody Medicalcheckup checkup) {
        int result = repository.completeCheckup(id, checkup);
        return result > 0 ?
                ResponseEntity.ok("Đã hoàn tất khám sức khỏe") :
                ResponseEntity.status(404).body("Không tìm thấy checkup");
    }

    // ✅ Step 5: Get All
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    // ✅ Step 6: Get By ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Medicalcheckup checkup = repository.findById(id).orElse(null);
        if (checkup == null) {
            return ResponseEntity.status(404).body("Không tìm thấy khám sức khỏe");
        }
        return ResponseEntity.ok(checkup);
    }
}
