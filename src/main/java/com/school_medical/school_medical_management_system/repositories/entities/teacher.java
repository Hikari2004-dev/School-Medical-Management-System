package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "teachers")
public class teacher {

    @Id
    private Long teacherID;

    @OneToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    private String className;

    @OneToMany(mappedBy = "teacher")
    private List<StudentList> studentLists;

    public teacher() {
    }

    public teacher(Long teacherID, User user, String className, List<StudentList> studentLists) {
        this.teacherID = teacherID;
        this.user = user;
        this.className = className;
        this.studentLists = studentLists;
    }

    // Getters and Setters

    public Long getTeacherID() {
        return teacherID;
    }

    public void setTeacherID(Long teacherID) {
        this.teacherID = teacherID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public List<StudentList> getStudentLists() {
        return studentLists;
    }

    public void setStudentLists(List<StudentList> studentLists) {
        this.studentLists = studentLists;
    }
}
