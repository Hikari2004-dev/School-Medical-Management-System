package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.entites.Student;

public interface IStudentRepository {
    int saveStudent(Student student);
    int saveHealthInfo(Healthinfo healthInfo);
    void saveParentStudent(int parentUserId, int studentId);
}
