package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "studentevent")
public class Studentevent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StudentEventID", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "Description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentID")
    private Student studentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EventID")
    private Medicalevent eventID;

    @OneToMany(mappedBy = "studentEventID")
    private Set<Medicalcheckup> medicalcheckups = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

    public Medicalevent getEventID() {
        return eventID;
    }

    public void setEventID(Medicalevent eventID) {
        this.eventID = eventID;
    }

    public Set<Medicalcheckup> getMedicalcheckups() {
        return medicalcheckups;
    }

    public void setMedicalcheckups(Set<Medicalcheckup> medicalcheckups) {
        this.medicalcheckups = medicalcheckups;
    }

}