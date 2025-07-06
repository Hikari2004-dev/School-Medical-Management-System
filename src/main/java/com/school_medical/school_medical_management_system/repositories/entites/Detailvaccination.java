package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "detailvaccination")
public class Detailvaccination {
    @Id
    @Column(name = "vaccination_id", nullable = false)
    private Integer id;

    @Column(name = "vaccine_name", length = 100)
    private String vaccineName;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "status", length = 50)
    private String status;

    @Column(name = "confirmed_by_parent")
    private Integer confirmedByParent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

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

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

}