package com.school_medical.school_medical_management_system.repositories.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
public class Medical {
    @Id
    private String medicalID;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "usage", nullable = false)
    private String usage;

    @Column(name = "dosage", nullable = false)
    private String dosage;

    @Column(name = "sentByParent", nullable = false)
    private boolean sentByParent;
    
    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "studentID")
    private Student student;

    public Medical() {
    }
    public Medical(String medicalID, String name, String usage, String dosage, boolean sentByParent, String status, Student student) {
        this.medicalID = medicalID;
        this.name = name;
        this.usage = usage;
        this.dosage = dosage;
        this.sentByParent = sentByParent;
        this.status = status;
        this.student = student;
    }
    public String getMedicalID() {
        return medicalID;
    }
    public void setMedicalID(String medicalID) {
        this.medicalID = medicalID;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUsage() {
        return usage;
    }
    public void setUsage(String usage) {
        this.usage = usage;
    }
    public String getDosage() {
        return dosage;
    }
    public void setDosage(String dosage) {
        this.dosage = dosage;
    }
    public boolean isSentByParent() {
        return sentByParent;
    }
    public void setSentByParent(boolean sentByParent) {
        this.sentByParent = sentByParent;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Student getStudent() {
        return student;
    }
    public void setStudent(Student student) {
        this.student = student;
    }
    
}

