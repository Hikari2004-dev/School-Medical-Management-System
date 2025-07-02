package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "medicalevent")
public class Medicalevent {
    @Id
    @Column(name = "EventID", nullable = false)
    private Integer id;

    @Column(name = "Status", length = 50)
    private String status;

    @Lob
    @Column(name = "Description")
    private String description;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "StudentName", length = 100)
    private String studentName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HeadmasterID")
    private Headmaster headmasterID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Headmaster getHeadmasterID() {
        return headmasterID;
    }

    public void setHeadmasterID(Headmaster headmasterID) {
        this.headmasterID = headmasterID;
    }

}