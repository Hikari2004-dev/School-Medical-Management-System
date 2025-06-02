package com.school_medical.school_medical_management_system.repositories.entities.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.school_medical.school_medical_management_system.repositories.entities.student.StudentList;

import jakarta.persistence.CascadeType;

@Entity
@Table(name = "teachers")
public class Teacher {
    @Id
    private Long teacherID;

    @Column(name = "className", nullable = false)
    private String className;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    @JsonManagedReference
    private User user;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<StudentList> classes;

    public Teacher() {
    }

    public Teacher(Long teacherID, String className, User user, List<StudentList> classes) {
        this.teacherID = teacherID;
        this.className = className;
        this.user = user;
        this.classes = classes;
    }

    public Long getTeacherID() {
        return teacherID;
    }

    public void setTeacherID(Long teacherID) {
        this.teacherID = teacherID;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<StudentList> getClasses() {
        return classes;
    }

    public void setClasses(List<StudentList> classes) {
        this.classes = classes;
    }

}
