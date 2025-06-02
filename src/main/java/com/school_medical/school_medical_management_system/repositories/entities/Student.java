package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

import java.util.List;

@Entity
@Table(name = "Students")
public class Student {
    @Id
    private String studentID;

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "gender", nullable = false)
    private String gender;
    @Column(name = "grade", nullable = false)
    private String grade;
    @Column(name = "dateOfBirth", nullable = false)
    private String dateOfBirth;

    @OneToOne
    @JoinColumn(name = "healthInfoID")
    private HealthInfo healthInfo;

    @ManyToOne
    @JoinColumn(name = "classId")
    private StudentList classEntity;

    @OneToMany(mappedBy = "student")
    private List<StudentParent> studentParents;

    @OneToMany(mappedBy = "student")
    private List<DetailVaccination> vaccinations;

  @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Medical> medicals;

    @ManyToOne
    @JoinColumn(name = "EventId")
    private MedicalEvent medicalEvent;

    public Student() {
    }

    public Student(String studentID, String name, String gender, String grade, String dateOfBirth,
            HealthInfo healthInfo, StudentList classEntity, List<StudentParent> studentParents,
            List<DetailVaccination> vaccinations, List<Medical> medicals) {
        this.studentID = studentID;
        this.name = name;
        this.gender = gender;
        this.grade = grade;
        this.dateOfBirth = dateOfBirth;
        this.healthInfo = healthInfo;
        this.classEntity = classEntity;
        this.studentParents = studentParents;
        this.vaccinations = vaccinations;
        this.medicals = medicals;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public HealthInfo getHealthInfo() {
        return healthInfo;
    }

    public void setHealthInfo(HealthInfo healthInfo) {
        this.healthInfo = healthInfo;
    }

    public StudentList getClassEntity() {
        return classEntity;
    }

    public void setClassEntity(StudentList classEntity) {
        this.classEntity = classEntity;
    }

    public List<StudentParent> getStudentParents() {
        return studentParents;
    }

    public void setStudentParents(List<StudentParent> studentParents) {
        this.studentParents = studentParents;
    }

    public List<DetailVaccination> getVaccinations() {
        return vaccinations;
    }

    public void setVaccinations(List<DetailVaccination> vaccinations) {
        this.vaccinations = vaccinations;
    }

    public List<Medical> getMedicals() {
        return medicals;
    }

    public void setMedicals(List<Medical> medicals) {
        this.medicals = medicals;
    }

}
