package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.repositories.IParentStudentRepository;
import com.school_medical.school_medical_management_system.services.IParentStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParentStudentServiceImpl implements IParentStudentService {

    @Autowired
    private IParentStudentRepository repository;

    @Override
    public boolean isStudentBelongsToParent(int parentId, int studentId) {
        return repository.isStudentBelongsToParent(parentId, studentId);
    }
}
