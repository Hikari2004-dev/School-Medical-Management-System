package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;




@Entity
@Table(name = "parent")
public class Parent {
    @Id
    private Long parentID;

    @OneToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @Column(name = "studentID", nullable = false)
    private Long studentID;

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

}
    