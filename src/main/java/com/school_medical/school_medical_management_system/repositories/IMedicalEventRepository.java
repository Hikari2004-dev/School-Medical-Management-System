package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.models.ApprovalRequest;
import com.school_medical.school_medical_management_system.models.MedicalEventDTO;

import java.util.List;

public interface IMedicalEventRepository {
    public List<MedicalEventDTO> getAllEvents();
    public void createEvent(MedicalEventDTO event);
    public void updateEvent(Long id, MedicalEventDTO event);
    public void approveEvent(Long id, ApprovalRequest approvalRequest);
}
