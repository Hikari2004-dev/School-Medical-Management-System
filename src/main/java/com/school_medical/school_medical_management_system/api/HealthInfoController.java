package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.services.impl.HealthInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/healthinfo")
public class HealthInfoController {

    @Autowired
    private HealthInfoService service;

    @GetMapping("/{studentId}")
    public Healthinfo getHealthInfo(@PathVariable int studentId) {
        return service.getHealthInfoByStudentId(studentId);
    }

    @PostMapping("/save")
    public String saveHealthInfo(@RequestBody Healthinfo healthInfo) {
        service.saveOrUpdateHealthInfo(healthInfo);
        return "Success";
    }
}
