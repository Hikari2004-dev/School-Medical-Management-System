package com.school_medical.school_medical_management_system.repositories.entities;

import java.util.ArrayList;
import java.util.List; 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType; 

@Entity
@Table(name = "Parent")
public class Parent {
    @Id
    private Long parentID;

    @OneToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @Column(name = "studentID", nullable = false)
    private Long studentID;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students = new ArrayList<>();

    public Parent() {
    }

    public Parent(Long parentID, User user, Long studentID) {
        this.parentID = parentID;
        this.user = user;
        this.studentID = studentID;
    }

    public Long getParentID() {
        return parentID;
    }

    public void setParentID(Long parentID) {
        this.parentID = parentID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getStudentID() {
        return studentID;
    }

    public void setStudentID(Long studentID) {
        this.studentID = studentID;
    }

    // Getter and Setter for students (optional but recommended)
    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}