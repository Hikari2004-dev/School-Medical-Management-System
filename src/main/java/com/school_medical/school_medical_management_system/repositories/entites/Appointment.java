package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AppointmentID", nullable = false)
    private Integer id;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "Confirm")
    private Boolean confirm;

    @Lob
    @Column(name = "Description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProvidedServiceLogID")
    private ProvidedServiceLog providedServiceLogID;

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

    public Boolean getConfirm() {
        return confirm;
    }

    public void setConfirm(Boolean confirm) {
        this.confirm = confirm;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProvidedServiceLog getProvidedServiceLogID() {
        return providedServiceLogID;
    }

    public void setProvidedServiceLogID(ProvidedServiceLog providedServiceLogID) {
        this.providedServiceLogID = providedServiceLogID;
    }

}