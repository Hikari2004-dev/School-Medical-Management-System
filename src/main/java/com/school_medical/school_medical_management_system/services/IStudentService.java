package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.entites.Student;

import java.util.List;

public interface IStudentService {
    void saveStudentWithHealthInfo(Student student, Healthinfo healthinfo);
    void saveStudentWithHealthInfoAndLinkParent(Student student, Healthinfo healthinfo, int parentUserId);
    List<Student> getAllStudents();  // Phương thức để lấy danh sách học sinh
}
