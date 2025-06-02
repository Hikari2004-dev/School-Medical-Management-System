package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.List;

    
@Entity
@Table(name = "MedicalSupplies")
public class MedicalSupplies {

    @Id
    private String medicalSupplyID;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "Quantity", nullable = false)
    private String quantity;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "lastCheckedDate", nullable = false)
    private boolean LastCheckedDate;

    @ManyToOne
    @JoinColumn(name = "EventId", nullable = false)
    private MedicalEvent medicalEvent;

    @OneToMany(mappedBy = "SupplyID")
    private List<IncidentSupplies> incidentSupplies;

    public MedicalSupplies() {
    }

    public MedicalSupplies(String medicalSupplyID, String name, String quantity, String description, boolean lastCheckedDate, MedicalEvent medicalEvent) {
        this.medicalSupplyID = medicalSupplyID;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.LastCheckedDate = lastCheckedDate;
        this.medicalEvent = medicalEvent;
    }

    public String getMedicalSupplyID() {
        return medicalSupplyID;
    }
    public void setMedicalSupplyID(String medicalSupplyID) {
        this.medicalSupplyID = medicalSupplyID;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getQuantity() {
        return quantity;
    }
    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public boolean isLastCheckedDate() {
        return LastCheckedDate;
    }
    public void setLastCheckedDate(boolean lastCheckedDate) {
        LastCheckedDate = lastCheckedDate;
    }
    public MedicalEvent getMedicalEvent() {
        return medicalEvent;
    }
    public void setMedicalEvent(MedicalEvent medicalEvent) {
        this.medicalEvent = medicalEvent;
    }
    
}

