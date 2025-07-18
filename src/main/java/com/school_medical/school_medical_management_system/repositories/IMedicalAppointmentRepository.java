package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.MedicalAppointment;
import java.util.List;

public interface IMedicalAppointmentRepository {
    void createAppointment(MedicalAppointment appointment);
    List<MedicalAppointment> getAppointmentsByStudentId(int studentId);
    void approveAppointment(int appointmentId, String status);
    List<MedicalAppointment> getAllAppointments();  // Lấy tất cả cuộc hẹn
    void updateAppointment(MedicalAppointment appointment);  // Cập nhật cuộc hẹn
}
