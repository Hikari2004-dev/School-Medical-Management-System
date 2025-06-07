package com.school_medical.school_medical_management_system.repositories.entities.report;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.school_medical.school_medical_management_system.repositories.entities.medical.MedicalSupplies;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;

@Entity
@Table(name = "IncidentSupplies")
public class IncidentSupplies {

    @Id
    @GeneratedValue
    private Long Id;

    @Column(name = "supplyID", nullable = false)
    private String supplyID;

    @Column(name = "quantityUsed", nullable = false)
    private int quantityUsed;

    @Column(name = "incidentID", nullable = false)
    private Long incidentID;

    @ManyToOne
    @JoinColumn(name = "incidentSupplies", insertable = false, updatable = false)
    private IncidentSupplies incident;

    @ManyToOne
    @JoinColumn(name = "supplyID", insertable = false, updatable = false)
    private MedicalSupplies supply;
    
    

    public IncidentSupplies() {
    }

    public IncidentSupplies(Long id, String supplyID, int quantityUsed, Long incidentID) {
        this.Id = id;
        this.supplyID = supplyID;
        this.quantityUsed = quantityUsed;
        this.incidentID = incidentID;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getSupplyID() {
        return supplyID;
    }

    public void setSupplyID(String supplyID) {
        this.supplyID = supplyID;
    }

    public int getQuantityUsed() {
        return quantityUsed;
    }

    public void setQuantityUsed(int quantityUsed) {
        this.quantityUsed = quantityUsed;
    }

    public Long getIncidentID() {
        return incidentID;
    }

    public void setIncidentID(Long incidentID) {
        this.incidentID = incidentID;
    }

    

}
