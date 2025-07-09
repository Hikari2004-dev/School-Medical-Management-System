package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.repositories.IStudentParent;
import com.school_medical.school_medical_management_system.repositories.entites.StudentParent;
import com.school_medical.school_medical_management_system.services.IAppUserService;
import com.school_medical.school_medical_management_system.services.IStudentParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentParentService implements IStudentParentService {

    @Autowired
    private IAppUserService appUserService;

    @Autowired
    private IStudentParent studentParent;

    @Override
    public List<StudentParent> getStudentsByParentId() {
        int parentUserId = appUserService.getUserByEmail().getId();
        List<StudentParent> studentParents = new ArrayList<>();
        studentParents = studentParent.getStudentsByParentId(parentUserId);
        return studentParents;
    }
}
