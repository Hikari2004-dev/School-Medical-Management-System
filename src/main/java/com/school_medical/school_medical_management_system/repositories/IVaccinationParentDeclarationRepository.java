package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.models.VaccinationParentDeclarationDTO;

import java.util.List;

public interface IVaccinationParentDeclarationRepository {
    List<VaccinationParentDeclarationDTO> getAllByStudentId(int studentId);
    void save(VaccinationParentDeclarationDTO dto);
}
