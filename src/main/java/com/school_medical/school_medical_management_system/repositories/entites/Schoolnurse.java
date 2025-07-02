package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "schoolnurse")
public class Schoolnurse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NurseID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "StudentID")
    private Student studentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProvidedServiceLogID")
    private Providedservicelog providedServiceLogID;

    @OneToMany(mappedBy = "nurseID")
    private Set<Incidentreport> incidentreports = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

    public Providedservicelog getProvidedServiceLogID() {
        return providedServiceLogID;
    }

    public void setProvidedServiceLogID(Providedservicelog providedServiceLogID) {
        this.providedServiceLogID = providedServiceLogID;
    }

    public Set<Incidentreport> getIncidentreports() {
        return incidentreports;
    }

    public void setIncidentreports(Set<Incidentreport> incidentreports) {
        this.incidentreports = incidentreports;
    }

}