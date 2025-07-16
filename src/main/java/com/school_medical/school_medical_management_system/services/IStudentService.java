package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.entites.Student;

public interface IStudentService {
    void saveStudentWithHealthInfo(Student student, Healthinfo healthinfo);
}
