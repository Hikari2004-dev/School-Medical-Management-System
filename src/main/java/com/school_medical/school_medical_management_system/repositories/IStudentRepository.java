package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Student;
import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import java.util.List;

public interface IStudentRepository {
    int saveStudent(Student student);
    int saveHealthInfo(Healthinfo healthInfo);
    void saveParentStudent(int parentUserId, int studentId);
    List<Student> getAllStudents();  // Phương thức này phải được khai báo trong interface
}

