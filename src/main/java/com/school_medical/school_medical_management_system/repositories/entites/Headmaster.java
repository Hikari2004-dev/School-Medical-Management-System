package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "headmaster")
public class Headmaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HeadmasterID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

    @OneToMany(mappedBy = "headmasterID")
    private Set<Medicalevent> medicalevents = new LinkedHashSet<>();

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

    public Set<Medicalevent> getMedicalevents() {
        return medicalevents;
    }

    public void setMedicalevents(Set<Medicalevent> medicalevents) {
        this.medicalevents = medicalevents;
    }

}