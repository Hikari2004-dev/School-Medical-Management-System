package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Student;
import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import java.util.List;

public interface IStudentRepository {
    int saveStudent(Student student);  // Lưu học sinh
    int saveHealthInfo(Healthinfo healthInfo);  // Lưu thông tin sức khỏe
    void saveParentStudent(int parentUserId, int studentId, String relationship);  // Lưu mối quan hệ cha/mẹ
    List<Student> getAllStudents();  // Lấy tất cả học sinh
    List<Student> getStudentsByParentId(int parentUserId);  // Lấy học sinh theo ID của phụ huynh
}
