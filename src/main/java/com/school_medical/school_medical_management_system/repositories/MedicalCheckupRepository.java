package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Medicalcheckup;

import java.util.List;
import java.util.Optional;

public interface MedicalCheckupRepository {
    int createPlan(Medicalcheckup checkup);
    int approvePlan(int checkupId);
    int parentConsent(int studentId, boolean consent);
    int completeCheckup(int checkupId, Medicalcheckup checkup);
    List<Medicalcheckup> findAll();
    Optional<Medicalcheckup> findById(int id);
}
