package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.impl.HealthInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HealthInfoService {

    @Autowired
    private HealthInfoRepository repository;

    public Healthinfo getHealthInfoByStudentId(int studentId) {
        try {
            return repository.findByStudentId(studentId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveOrUpdateHealthInfo(Healthinfo info) {
        try {
            repository.saveOrUpdate(info);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}