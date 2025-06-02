package com.school_medical.school_medical_management_system.repositories.entities.student;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;



@Entity
public class HealthInfo {
    @Id
    private String healthInfoID;

    @Column(name = "MedicalHistory", nullable = false)
    private String medicalHistory;

    @Column(name = "Allergy", nullable = false)
    private String allergy;

    @Column(name = "Hearing", nullable = false)
    private String hearing;

    @Column(name = "Vision", nullable = false)
    private String vision;
    
    @Column(name = "ChronicDisease", nullable = false)
    private String chronicDisease;

    @OneToOne
    @JoinColumn(name = "StudentId", nullable = false)
    private Student student;


    public HealthInfo() {
    }
    public HealthInfo(String healthInfoID, String medicalHistory, String allergy, String hearing, String vision, String chronicDisease) {
        this.healthInfoID = healthInfoID;
        this.medicalHistory = medicalHistory;
        this.allergy = allergy;
        this.hearing = hearing;
        this.vision = vision;
        this.chronicDisease = chronicDisease;
    }
    public String getHealthInfoID() {
        return healthInfoID;
    }
    public void setHealthInfoID(String healthInfoID) {
        this.healthInfoID = healthInfoID;
    }
    public String getMedicalHistory() {
        return medicalHistory;
    }
    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }
    public String getAllergy() {
        return allergy;
    }
    public void setAllergy(String allergy) {
        this.allergy = allergy;
    }
    public String getHearing() {
        return hearing;
    }
    public void setHearing(String hearing) {
        this.hearing = hearing;
    }
    public String getVision() {
        return vision;
    }
    public void setVision(String vision) {
        this.vision = vision;
    }
    public String getChronicDisease() {
        return chronicDisease;
    }
    public void setChronicDisease(String chronicDisease) {
        this.chronicDisease = chronicDisease;
    }
    
}
