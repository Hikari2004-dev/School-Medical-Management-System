package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.models.ProvidedServiceLogRequest;
import com.school_medical.school_medical_management_system.repositories.ParentRepository;
import com.school_medical.school_medical_management_system.repositories.ProvidedServiceLogRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Parent;
import com.school_medical.school_medical_management_system.repositories.entites.Providedservicelog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class ProvidedServiceLogService {

    @Autowired
    private ProvidedServiceLogRepository logRepository;

    @Autowired
    private ParentRepository parentRepository;

    public Providedservicelog sendMedication(Integer parentId, ProvidedServiceLogRequest request) {
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found with ID: " + parentId));

        Providedservicelog log = new Providedservicelog();
        log.setTimestamp(LocalDateTime.now().toInstant(ZoneOffset.UTC));
        log.setNameType(request.getNameType());
        log.setParentID(parent);
        log.setStudentID(request.getStudentId());
        log.setNurseID(request.getNurseId());

        return logRepository.save(log);
    }
}
