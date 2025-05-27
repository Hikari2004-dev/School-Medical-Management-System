package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Student {

    @Id
    private String studentID;

    private String name;
    private String gender;
    private String grade;
    private String dateOfBirth;

    @ManyToOne
    @JoinColumn(name = "healthInfoID")
    private HealthInfo healthInfo;

    @ManyToOne
    @JoinColumn(name = "ClassID")  // Tránh dùng từ khóa class
    private ClassEntity classEntity;

    @OneToMany(mappedBy = "student")
    private List<StudentList> studentLists;

    @OneToMany(mappedBy = "student")
    private List<StudentParent> studentParents;

    @OneToMany(mappedBy = "student")
    private List<DetailVaccination> vaccinations;

    @OneToMany(mappedBy = "student")
    private List<Medical> medicals;

    // Constructor không tham số
    public Student() {
    }

    // Constructor đầy đủ tham số (đã thêm studentLists)
    public Student(String studentID, String name, String gender, String grade, String dateOfBirth,
                   HealthInfo healthInfo, ClassEntity classEntity, List<StudentList> studentLists,
                   List<StudentParent> studentParents, List<DetailVaccination> vaccinations,
                   List<Medical> medicals) {
        this.studentID = studentID;
        this.name = name;
        this.gender = gender;
        this.grade = grade;
        this.dateOfBirth = dateOfBirth;
        this.healthInfo = healthInfo;
        this.classEntity = classEntity;
        this.studentLists = studentLists;
        this.studentParents = studentParents;
        this.vaccinations = vaccinations;
        this.medicals = medicals;
    }

    // Getters and Setters

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

    public ClassEntity getClassEntity() {
        return classEntity;
    }

    public void setClassEntity(ClassEntity classEntity) {
        this.classEntity = classEntity;
    }

    public List<StudentList> getStudentLists() {
        return studentLists;
    }

    public void setStudentLists(List<StudentList> studentLists) {
        this.studentLists = studentLists;
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
