package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.repositories.IStudentRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.entites.Student;
import com.school_medical.school_medical_management_system.services.IStudentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements IStudentService {

    private final IStudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(IStudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional
    public void saveStudentWithHealthInfo(Student student, Healthinfo healthinfo) {
        // Lưu học sinh và lấy student_id
        int studentId = studentRepository.saveStudent(student);

        // Cập nhật studentId cho HealthInfo
        healthinfo.setStudentId(studentId);

        // Lưu thông tin sức khỏe
        studentRepository.saveHealthInfo(healthinfo);
    }

    @Override
    @Transactional
    public void saveStudentWithHealthInfoAndLinkParent(Student student, Healthinfo healthinfo, int parentUserId) {
        int studentId = studentRepository.saveStudent(student);
        healthinfo.setStudentId(studentId);
        studentRepository.saveHealthInfo(healthinfo);
        studentRepository.saveParentStudent(parentUserId, studentId); // Gắn học sinh với phụ huynh
    }
}
