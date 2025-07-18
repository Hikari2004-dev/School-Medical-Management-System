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
                student.getGrade(), student.getClassId());  // Thêm classId vào câu lệnh

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
        String sql = "SELECT * FROM student";  // SQL query để lấy tất cả học sinh
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Student student = new Student();

            // Lấy student_id từ ResultSet và gán vào đối tượng Student
            student.setId(rs.getInt("student_id"));

            // Lấy tên học sinh từ ResultSet và gán vào đối tượng Student
            student.setName(rs.getString("name"));

            // Lấy ngày sinh từ ResultSet và chuyển từ java.sql.Date thành LocalDate
            java.sql.Date sqlDate = rs.getDate("date_of_birth");
            if (sqlDate != null) {
                student.setDateOfBirth(sqlDate.toLocalDate());
            } else {
                student.setDateOfBirth(null);  // Nếu ngày sinh là null, gán là null
            }

            // Lấy giới tính từ ResultSet và gán vào đối tượng Student
            student.setGender(rs.getString("gender"));

            // Lấy lớp học từ ResultSet và gán vào đối tượng Student
            student.setGrade(rs.getString("grade"));

            // Lấy class_id từ ResultSet và gán vào đối tượng Student
            student.setClassId(rs.getInt("class_id"));

            return student;  // Trả về đối tượng Student đã được gán thông tin
        });
    }

    @Override
    public List<Student> getStudentsByParentId(int parentUserId) {
        String sql = "SELECT s.student_id, s.name, s.date_of_birth, s.gender, s.grade, s.class_id " +
                "FROM mesch.student s " +
                "JOIN mesch.parentstudent ps ON s.student_id = ps.student_id " +
                "WHERE ps.parent_user_id = ?";

        return jdbcTemplate.query(sql, new Object[]{parentUserId}, (rs, rowNum) -> {
            Student student = new Student();
            student.setId(rs.getInt("student_id"));
            student.setName(rs.getString("name"));
            student.setDateOfBirth(rs.getDate("date_of_birth").toLocalDate());
            student.setGender(rs.getString("gender"));
            student.setGrade(rs.getString("grade"));
            student.setClassId(rs.getInt("class_id"));
            return student;
        });
    }
}
