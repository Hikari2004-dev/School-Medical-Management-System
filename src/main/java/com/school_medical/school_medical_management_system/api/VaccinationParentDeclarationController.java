package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.VaccinationParentDeclarationDTO;
import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import com.school_medical.school_medical_management_system.services.IAppUserService;
import com.school_medical.school_medical_management_system.services.IVaccinationParentDeclarationService;
import com.school_medical.school_medical_management_system.services.IParentStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vaccination-history")
public class VaccinationParentDeclarationController {

    @Autowired
    private IVaccinationParentDeclarationService service;

    @Autowired
    private IAppUserService appUserService;

    @Autowired
    private IParentStudentService parentStudentService;

    // ✅ Xem lịch sử tiêm của con
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getHistoryByStudent(
            @AuthenticationPrincipal User user,
            @PathVariable int studentId) {

        String email = user.getUsername();
        Appuser parent = appUserService.getUserByEmail(email);
        if (parent == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid parent user");
        }

        if (!parentStudentService.isStudentBelongsToParent(parent.getId(), studentId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to access this student's data.");
        }

        List<VaccinationParentDeclarationDTO> list = service.getAllByStudentId(studentId);
        return ResponseEntity.ok(list);
    }

    // ✅ Phụ huynh khai báo lịch sử tiêm chủng cho con
    @PostMapping
    public ResponseEntity<?> declareVaccinationHistory(
            @AuthenticationPrincipal User user,
            @RequestBody VaccinationParentDeclarationDTO dto) {

        String email = user.getUsername();
        Appuser parent = appUserService.getUserByEmail(email);
        if (parent == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid parent user");
        }

        // Kiểm tra quyền khai báo
        if (!parentStudentService.isStudentBelongsToParent(parent.getId(), dto.getStudentId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to declare for this student.");
        }

        // Gán parentId vào DTO trước khi lưu
        dto.setParentId(parent.getId());

        service.save(dto);
        return ResponseEntity.ok("Vaccination history declared successfully.");
    }
}
