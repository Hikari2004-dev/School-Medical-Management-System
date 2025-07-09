package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.models.ApprovalRequest;
import com.school_medical.school_medical_management_system.models.MedicalEventDTO;

import java.util.List;

public interface IMedicalEventService {
    List<MedicalEventDTO> getAllEvents();
    MedicalEventDTO createEvent(MedicalEventDTO eventDTO);
    MedicalEventDTO updateEvent(Long id, MedicalEventDTO eventDTO);
    MedicalEventDTO approveEvent(Long id, ApprovalRequest approvalRequest);
}
