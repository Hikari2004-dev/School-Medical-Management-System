package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "medicalcheckup")
public class Medicalcheckup {
    @Id
    @Column(name = "CheckupID", nullable = false)
    private Integer id;

    @Column(name = "Date")
    private LocalDate date;

    @Lob
    @Column(name = "Description")
    private String description;

    @Column(name = "Status", length = 50)
    private String status;

    @Column(name = "NeedFollowUp")
    private Boolean needFollowUp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentID")
    private Student studentID;

    @Column(name = "CreatedByUserID")
    private Integer createdByUserID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HealthInfoID")
    private Healthinfo healthInfoID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentEventID")
    private Studentevent studentEventID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getNeedFollowUp() {
        return needFollowUp;
    }

    public void setNeedFollowUp(Boolean needFollowUp) {
        this.needFollowUp = needFollowUp;
    }

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

    public Integer getCreatedByUserID() {
        return createdByUserID;
    }

    public void setCreatedByUserID(Integer createdByUserID) {
        this.createdByUserID = createdByUserID;
    }

    public Healthinfo getHealthInfoID() {
        return healthInfoID;
    }

    public void setHealthInfoID(Healthinfo healthInfoID) {
        this.healthInfoID = healthInfoID;
    }

    public Studentevent getStudentEventID() {
        return studentEventID;
    }

    public void setStudentEventID(Studentevent studentEventID) {
        this.studentEventID = studentEventID;
    }

}