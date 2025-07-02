package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "detailvaccination")
public class Detailvaccination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VaccinationID", nullable = false)
    private Integer id;

    @Column(name = "VaccineName", length = 100)
    private String vaccineName;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "Status", length = 50)
    private String status;

    @Column(name = "ConfirmedByParent")
    private Integer confirmedByParent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentID")
    private Student studentID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVaccineName() {
        return vaccineName;
    }

    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getConfirmedByParent() {
        return confirmedByParent;
    }

    public void setConfirmedByParent(Integer confirmedByParent) {
        this.confirmedByParent = confirmedByParent;
    }

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

}