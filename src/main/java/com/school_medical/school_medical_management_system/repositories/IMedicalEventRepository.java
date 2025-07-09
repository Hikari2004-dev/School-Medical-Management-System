package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.models.ApprovalRequest;
import com.school_medical.school_medical_management_system.repositories.entites.MedicalEvent;

import java.util.List;

public interface IMedicalEventRepository {
    public List<MedicalEvent> getAllEvents();
    public void createEvent(MedicalEvent event);
    public void updateEvent(Long id, MedicalEvent event);
    public void approveEvent(Long id, ApprovalRequest approvalRequest);
}
