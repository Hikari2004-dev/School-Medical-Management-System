package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "teachers")
public class teacher {
    @Id
    private Long teacherID;

    @OneToOne
    @JoinColumn(name = "userID",  nullable= false)
    private User user;

    @Column(name = "className", nullable = false)
    private String className;



    public teacher() {
    }

    public teacher(Long teacherID, User user, String className) {
        this.teacherID = teacherID;
        this.user = user;
        this.className = className;
    }

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

    
}
