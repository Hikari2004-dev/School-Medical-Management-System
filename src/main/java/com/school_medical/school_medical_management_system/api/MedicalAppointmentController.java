package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.ApproveAppointmentRequest;
import com.school_medical.school_medical_management_system.repositories.entites.MedicalAppointment;
import com.school_medical.school_medical_management_system.services.IMedicalAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class MedicalAppointmentController {

    @Autowired
    private IMedicalAppointmentService service;

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody MedicalAppointment appointment) {
        try {
            service.createAppointment(appointment);
            return ResponseEntity.ok("Appointment created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MedicalAppointment>> getAppointmentsByStudent(@PathVariable int studentId) {
        List<MedicalAppointment> appointments = service.getAppointmentsByStudentId(studentId);
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/approve")
    public ResponseEntity<?> approveAppointment(@RequestBody ApproveAppointmentRequest request) {
        try {
            String status = request.getStatus();
            if (!status.equalsIgnoreCase("Approved") && !status.equalsIgnoreCase("Rejected")) {
                return ResponseEntity.badRequest().body("Status must be 'Approved' or 'Rejected'");
            }
            service.approveAppointment(request.getAppointmentId(), status);
            return ResponseEntity.ok("Appointment " + status + " successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
