package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

@Entity
@Table(name = "schoolnurse")
public class Schoolnurse {
    @Id
    @Column(name = "NurseID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentID")
    private Student studentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProvidedServiceLogID")
    private ProvidedServiceLog providedServiceLogID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

    public ProvidedServiceLog getProvidedServiceLogID() {
        return providedServiceLogID;
    }

    public void setProvidedServiceLogID(ProvidedServiceLog providedServiceLogID) {
        this.providedServiceLogID = providedServiceLogID;
    }

}