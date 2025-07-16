package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.StudentHealthRequest;
import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.entites.Student;
import com.school_medical.school_medical_management_system.repositories.entites.Studentclass;
import com.school_medical.school_medical_management_system.services.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final IStudentService studentService;

    @Autowired
    public StudentController(IStudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/save")
    public String saveStudentWithHealthInfo(@RequestBody StudentHealthRequest request) {
        // Chuyển đổi dữ liệu từ request thành đối tượng Student
        Student student = new Student();
        student.setName(request.getStudentName());

        // Chuyển đổi ngày tháng sinh từ Date sang LocalDate
        student.setDateOfBirth(request.getDob().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate());

        student.setGender(request.getGender());
        student.setGrade(request.getGrade());

        // Giả sử bạn đã có phương thức để lấy thông tin lớp học
        Studentclass studentClass = new Studentclass();
        studentClass.setId(request.getClassId());
        student.setClassField(studentClass);

        // Chuyển đổi dữ liệu từ request thành đối tượng Healthinfo
        Healthinfo healthinfo = new Healthinfo();
        healthinfo.setAllergy(request.getAllergy());
        healthinfo.setChronicDisease(request.getChronicDisease());
        healthinfo.setVision(request.getVision());
        healthinfo.setHearing(request.getHearing());
        healthinfo.setMedicalHistory(request.getMedicalHistory());
        healthinfo.setHeight(request.getHeight());
        healthinfo.setWeight(request.getWeight());
        healthinfo.setBmi(request.getBmi());

        // Lưu học sinh và thông tin sức khỏe
        studentService.saveStudentWithHealthInfo(student, healthinfo);

        return "Student and health information saved successfully!";
    }
}
