package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "medicalcheckup")
public class Medicalcheckup {
    @Id
    @Column(name = "checkup_id", nullable = false)
    private Integer id;

    @Column(name = "date")
    private LocalDate date;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "status", length = 50)
    private String status;

    @Column(name = "need_follow_up")
    private Boolean needFollowUp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "created_by_user_id")
    private Integer createdByUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "health_info_id")
    private Healthinfo healthInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_event_id")
    private Studentevent studentEvent;

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

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Integer getCreatedByUserId() {
        return createdByUserId;
    }

    public void setCreatedByUserId(Integer createdByUserId) {
        this.createdByUserId = createdByUserId;
    }

    public Healthinfo getHealthInfo() {
        return healthInfo;
    }

    public void setHealthInfo(Healthinfo healthInfo) {
        this.healthInfo = healthInfo;
    }

    public Studentevent getStudentEvent() {
        return studentEvent;
    }

    public void setStudentEvent(Studentevent studentEvent) {
        this.studentEvent = studentEvent;
    }

}