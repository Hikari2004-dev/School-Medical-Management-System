package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "providedservicelog")
public class ProvidedServiceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProvidedServiceLogID", nullable = false)
    private Integer id;

    @Column(name = "Timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "NameType", length = 100, nullable = false)
    private String nameType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentID", nullable = false)
    private Parent parent;

    @Column(name = "StudentID", nullable = false)
    private Integer studentId;

    @Column(name = "NurseID", nullable = false)
    private Integer nurseId;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getNameType() {
        return nameType;
    }

    public void setNameType(String nameType) {
        this.nameType = nameType;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getNurseId() {
        return nurseId;
    }

    public void setNurseId(Integer nurseId) {
        this.nurseId = nurseId;
    }
}
