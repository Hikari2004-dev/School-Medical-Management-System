package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Providedservicelog;

import java.util.Optional;
import java.util.List;

public interface ProvidedServiceLogRepository {
    int createMedicationRequest(Providedservicelog log);
    int confirmMedicationRequest(int logId, int nurseId);
    Optional<Providedservicelog> findById(int id);
    List<Providedservicelog> findAll();
}
