package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IStudentParent;
import com.school_medical.school_medical_management_system.repositories.entites.StudentParent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class StudentParentRepository implements IStudentParent {

    @Autowired
    private DataSource dataSource;

    @Override
    public List<StudentParent> getStudentsByParentId(int parentUserId) {
        List<StudentParent> studentParents = new ArrayList<>();
        String sql = "SELECT s.student_id, s.name, ps.relationship, ps.parent_user_id " +
                "FROM student s " +
                "JOIN parentstudent ps ON s.student_id = ps.student_id " +
                "WHERE ps.parent_user_id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, parentUserId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    StudentParent sp = new StudentParent();
                    sp.setStudent_id(rs.getInt("student_id"));
                    sp.setName(rs.getString("name"));
                    sp.setRelationship(rs.getString("relationship"));
                    sp.setParent_id(rs.getInt("parent_user_id"));
                    studentParents.add(sp);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return studentParents;
    }
}
