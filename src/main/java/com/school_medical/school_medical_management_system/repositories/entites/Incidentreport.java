package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "incidentreport")
public class Incidentreport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IncidentID", nullable = false)
    private Integer id;

    @Column(name = "Type", length = 50)
    private String type;

    @Column(name = "Date")
    private LocalDate date;

    @Lob
    @Column(name = "Description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentID")
    private Student studentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NurseID")
    private Schoolnurse nurseID;

    @OneToMany(mappedBy = "incidentID")
    private Set<Medicalsupply> medicalsupplies = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

    public Schoolnurse getNurseID() {
        return nurseID;
    }

    public void setNurseID(Schoolnurse nurseID) {
        this.nurseID = nurseID;
    }

    public Set<Medicalsupply> getMedicalsupplies() {
        return medicalsupplies;
    }

    public void setMedicalsupplies(Set<Medicalsupply> medicalsupplies) {
        this.medicalsupplies = medicalsupplies;
    }

}