package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "medicalsupplies")
public class Medicalsupply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SupplyID", nullable = false)
    private Integer id;

    @Column(name = "Name", length = 100)
    private String name;

    @Column(name = "Quantity")
    private Integer quantity;

    @Lob
    @Column(name = "Description")
    private String description;

    @Column(name = "LastCheckedDate")
    private LocalDate lastCheckedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IncidentID")
    private Incidentreport incidentID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getLastCheckedDate() {
        return lastCheckedDate;
    }

    public void setLastCheckedDate(LocalDate lastCheckedDate) {
        this.lastCheckedDate = lastCheckedDate;
    }

    public Incidentreport getIncidentID() {
        return incidentID;
    }

    public void setIncidentID(Incidentreport incidentID) {
        this.incidentID = incidentID;
    }

}