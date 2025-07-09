package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.models.ApprovalRequest;
import com.school_medical.school_medical_management_system.repositories.IMedicalEventRepository;
import com.school_medical.school_medical_management_system.repositories.entites.MedicalEvent;
import com.school_medical.school_medical_management_system.services.IMedicalEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalEventService implements IMedicalEventService {

    @Autowired
    private IMedicalEventRepository medicalEventRepository;

    @Override
    public List<MedicalEvent> getAllEvents() {
        return medicalEventRepository.getAllEvents();
    }

    @Override
    public MedicalEvent createEvent(MedicalEvent eventDTO) {
        medicalEventRepository.createEvent(eventDTO);
        return eventDTO;
    }

    @Override
    public MedicalEvent updateEvent(Long id, MedicalEvent eventDTO) {
        medicalEventRepository.updateEvent(id, eventDTO);
        return eventDTO;
    }

    @Override
    public MedicalEvent approveEvent(Long id, ApprovalRequest approvalRequest) {
        medicalEventRepository.approveEvent(id, approvalRequest);
        MedicalEvent dto = new MedicalEvent();
        dto.setEventId(id);
        dto.setApprovalStatus(approvalRequest.getApprovalStatus());
        dto.setApprovedBy(approvalRequest.getApprovedBy());
        return dto;
    }
}
