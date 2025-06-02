package com.school_medical.school_medical_management_system.repositories.entities;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "SchoolNurses")
public class SchoolNurse {
    @Id
    private String NurseID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @OneToMany(mappedBy = "schoolNurse", cascade = CascadeType.ALL)
    private List<MedicalEvent> medicalEvents;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private MedicalEvent medicalEvent;

    @OneToMany(mappedBy = "schoolNurse", cascade = CascadeType.ALL)
    private List<IncidentReport> incidentReports;

    public SchoolNurse() {
    }
    public SchoolNurse(String nurseID, User user) {
        this.NurseID = nurseID;
        this.user = user;
    }

    public String getNurseID() {
        return NurseID;
    }
    public void setNurseID(String nurseID) {
        this.NurseID = nurseID;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public List<MedicalEvent> getMedicalEvents() {
        return medicalEvents;
    }
    public void setMedicalEvents(List<MedicalEvent> medicalEvents) {
        this.medicalEvents = medicalEvents;
    }
    
}
