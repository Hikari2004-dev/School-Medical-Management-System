package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.models.ProvidedServiceLogRequest;
import com.school_medical.school_medical_management_system.repositories.ParentRepository;
import com.school_medical.school_medical_management_system.repositories.ProvidedServiceLogRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Parent;
import com.school_medical.school_medical_management_system.repositories.entites.ProvidedServiceLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProvidedServiceLogService {

    @Autowired
    private ProvidedServiceLogRepository logRepository;

    @Autowired
    private ParentRepository parentRepository;

    public ProvidedServiceLog sendMedication(Integer parentId, ProvidedServiceLogRequest request) {
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found with ID: " + parentId));

        ProvidedServiceLog log = new ProvidedServiceLog();
        log.setTimestamp(LocalDateTime.now());
        log.setNameType(request.getNameType());
        log.setParent(parent);
        log.setStudentId(request.getStudentId());
        log.setNurseId(request.getNurseId());

        return logRepository.save(log);
    }
}
