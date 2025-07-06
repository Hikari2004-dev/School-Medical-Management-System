package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "student_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "grade", length = 20)
    private String grade;

    @Column(name = "health_info_id")
    private Integer healthInfoId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Appuser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Parent parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Studentlist classField;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provided_service_log_id")
    private Providedservicelog providedServiceLog;

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

    public Integer getHealthInfoId() {
        return healthInfoId;
    }

    public void setHealthInfoId(Integer healthInfoId) {
        this.healthInfoId = healthInfoId;
    }

    public Appuser getUser() {
        return user;
    }

    public void setUser(Appuser user) {
        this.user = user;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

    public Studentlist getClassField() {
        return classField;
    }

    public void setClassField(Studentlist classField) {
        this.classField = classField;
    }

    public Providedservicelog getProvidedServiceLog() {
        return providedServiceLog;
    }

    public void setProvidedServiceLog(Providedservicelog providedServiceLog) {
        this.providedServiceLog = providedServiceLog;
    }

}