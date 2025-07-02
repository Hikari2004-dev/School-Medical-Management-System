package com.school_medical.school_medical_management_system.repositories.entites;

import com.school_medical.school_medical_management_system.repositories.entites.ProvidedServiceLog;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "StudentID", nullable = false)
    private Integer id;

    @Column(name = "Name", length = 100)
    private String name;

    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "Gender", length = 10)
    private String gender;

    @Column(name = "Grade", length = 20)
    private String grade;

    @Column(name = "HealthInfoID")
    private Integer healthInfoID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentID")
    private Parent parentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ClassID")
    private Studentlist classID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProvidedServiceLogID")
    private ProvidedServiceLog providedServiceLogID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Integer getHealthInfoID() {
        return healthInfoID;
    }

    public void setHealthInfoID(Integer healthInfoID) {
        this.healthInfoID = healthInfoID;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public Parent getParentID() {
        return parentID;
    }

    public void setParentID(Parent parentID) {
        this.parentID = parentID;
    }

    public Studentlist getClassID() {
        return classID;
    }

    public void setClassID(Studentlist classID) {
        this.classID = classID;
    }

    public ProvidedServiceLog getProvidedServiceLogID() {
        return providedServiceLogID;
    }

    public void setProvidedServiceLogID(ProvidedServiceLog providedServiceLogID) {
        this.providedServiceLogID = providedServiceLogID;
    }

}