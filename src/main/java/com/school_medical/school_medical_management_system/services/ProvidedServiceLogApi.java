package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.models.ProvidedServiceLogRequest;
import com.school_medical.school_medical_management_system.repositories.entites.ProvidedServiceLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/medication")
public class ProvidedServiceLogApi {

    @Autowired
    private ProvidedServiceLogService logService;

    @PostMapping("/send")
    public ProvidedServiceLog sendMedication(@RequestBody ProvidedServiceLogRequest request,
                                             @RequestHeader("X-Parent-ID") Integer parentId) {
        return logService.sendMedication(parentId, request);
    }
}
