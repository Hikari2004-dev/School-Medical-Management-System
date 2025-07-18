package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IStudentRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Healthinfo;
import com.school_medical.school_medical_management_system.repositories.entites.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepositoryImpl implements IStudentRepository {

    private final JdbcTemplate jdbcTemplate;

    public StudentRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int saveStudent(Student student) {
        String sql = "INSERT INTO student (name, date_of_birth, gender, grade, class_id) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, student.getName(), student.getDateOfBirth(), student.getGender(),
                student.getGrade(), student.getClassField().getId());

        // Lấy student_id của học sinh vừa được tạo ra
        String getLastIdSql = "SELECT LAST_INSERT_ID()";
        return jdbcTemplate.queryForObject(getLastIdSql, Integer.class); // Lấy student_id mới
    }


    @Override
    public int saveHealthInfo(Healthinfo healthInfo) {
        String sql = "INSERT INTO healthinfo (student_id, allergy, chronic_disease, vision, hearing, medical_history, height, weight, bmi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, healthInfo.getStudentId(), healthInfo.getAllergy(), healthInfo.getChronicDisease(),
                healthInfo.getVision(), healthInfo.getHearing(), healthInfo.getMedicalHistory(),
                healthInfo.getHeight(), healthInfo.getWeight(), healthInfo.getBmi());
    }

    @Override
    public void saveParentStudent(int parentUserId, int studentId) {
        String sql = "INSERT INTO parentstudent (parent_user_id, student_id, relationship) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, parentUserId, studentId, "Father"); // hoặc "Mother", nếu muốn linh hoạt, bạn có thể truyền vào
    }

    @Override
    public List<Student> getAllStudents() {
        String sql = "SELECT * FROM student";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Student student = new Student();
            student.setId(rs.getInt("student_id"));
            student.setName(rs.getString("name"));

            // Lấy giá trị date_of_birth từ ResultSet
            java.sql.Date sqlDate = rs.getDate("date_of_birth");  // Dùng rs.getDate() để lấy java.sql.Date

            // Chuyển java.sql.Date thành LocalDate
            if (sqlDate != null) {
                student.setDateOfBirth(sqlDate.toLocalDate());  // Chuyển đổi thành LocalDate
            } else {
                student.setDateOfBirth(null);  // Nếu giá trị là null
            }

            student.setGender(rs.getString("gender"));
            student.setGrade(rs.getString("grade"));

            // Thêm các trường khác tùy theo schema của bảng student
            return student;
        });
    }

}
