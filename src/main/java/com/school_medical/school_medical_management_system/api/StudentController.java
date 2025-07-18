package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.StudentHealthRequest;
import com.school_medical.school_medical_management_system.repositories.IUserRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.entites.Student;
import com.school_medical.school_medical_management_system.repositories.entites.Studentclass;
import com.school_medical.school_medical_management_system.services.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final IStudentService studentService;
    private final IUserRepository userRepository;

    @Autowired
    public StudentController(IStudentService studentService, IUserRepository userRepository) {
        this.studentService = studentService;
        this.userRepository = userRepository;
    }

    @PostMapping("/save")
    public String saveStudentWithHealthInfoAndLinkParent(@RequestBody StudentHealthRequest request) {
        // 1. Lấy email từ JWT đã giải mã
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        // 2. Truy vấn parent_user_id (user_id) từ database
        Appuser parent = userRepository.getUserByEmail(email);
        if (parent == null) {
            return "❌ Không tìm thấy phụ huynh với email: " + email;
        }
        int parentUserId = parent.getId();

        // 3. Tạo Student object
        Student student = new Student();
        student.setName(request.getStudentName());
        student.setDateOfBirth(request.getDob().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate());
        student.setGender(request.getGender());
        student.setGrade(request.getGrade());

        Studentclass studentClass = new Studentclass();
        studentClass.setId(request.getClassId());
        student.setClassField(studentClass);

        // 4. Tạo Healthinfo object
        Healthinfo healthinfo = new Healthinfo();
        healthinfo.setAllergy(request.getAllergy());
        healthinfo.setChronicDisease(request.getChronicDisease());
        healthinfo.setVision(request.getVision());
        healthinfo.setHearing(request.getHearing());
        healthinfo.setMedicalHistory(request.getMedicalHistory());
        healthinfo.setHeight(request.getHeight());
        healthinfo.setWeight(request.getWeight());
        healthinfo.setBmi(request.getBmi());

        // 5. Lưu dữ liệu
        studentService.saveStudentWithHealthInfoAndLinkParent(student, healthinfo, parentUserId);

        return "✅ Học sinh và thông tin sức khỏe đã được lưu và liên kết với phụ huynh!";
    }

    /**
     * Lấy tất cả học sinh
     */
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}
