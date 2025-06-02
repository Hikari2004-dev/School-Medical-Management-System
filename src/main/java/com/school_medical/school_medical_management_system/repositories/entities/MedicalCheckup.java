package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;


@Entity
@Table(name = "MedicalCheckup")
public class MedicalCheckup{

    @Id
    private String CheckupID;

    @Column(name = "Date", nullable = false)
    private String Date;

    @Column(name = "Status", nullable = false)
    private String Status;
    
    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "StudentID", nullable = false)   
    private String studentID;

    @Column(name = "CreatedByUserID", nullable = false)
    private String CreatedByUserID;

    @Column(name = "NeedFollowUp", nullable = false)
    private String NeedFollowUp;

    @ManyToOne
    @Column(name = "MedicalEventID", nullable = false)
    private MedicalEvent medicalEvent;

    public MedicalCheckup() {
    }
    public MedicalCheckup(String checkupID, String date, String status, String description, String studentID, String createdByUserID, String needFollowUp, MedicalEvent medicalEvent) {
        this.CheckupID = checkupID;
        this.Date = date;
        this.Status = status;
        this.description = description;
        this.studentID = studentID;
        this.CreatedByUserID = createdByUserID;
        this.NeedFollowUp = needFollowUp;
        this.medicalEvent = medicalEvent;
    }
    public String getCheckupID() {
        return CheckupID;
    }
    public void setCheckupID(String checkupID) {
        CheckupID = checkupID;
    }
    public String getDate() {
        return Date;
    }
    public void setDate(String date) {
        Date = date;
    }
    public String getStatus() {
        return Status;
    }
    public void setStatus(String status) {
        Status = status;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getStudentID() {
        return studentID;
    }
    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }
    public String getCreatedByUserID() {
        return CreatedByUserID;
    }
    public void setCreatedByUserID(String createdByUserID) {
        CreatedByUserID = createdByUserID;
    }
    public String getNeedFollowUp() {
        return NeedFollowUp;
    }
    public void setNeedFollowUp(String needFollowUp) {
        NeedFollowUp = needFollowUp;
    }
    public MedicalEvent getMedicalEvent() {
        return medicalEvent;
    }
    public void setMedicalEvent(MedicalEvent medicalEvent) {
        this.medicalEvent = medicalEvent;
    }
    
   
}


