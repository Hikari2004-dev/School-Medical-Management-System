package com.school_medical.school_medical_management_system.repositories.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Date;

@Entity
public class DetailVaccination {
    @Id
    private String vaccinationID;

    @Column(name = "vaccineName", nullable = false)
    private String vaccineName;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "confirmedByParent", nullable = false)   
    private boolean confirmedByParent;

    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "studentID")
    private Student student;

    public DetailVaccination() {
    }
    
    public DetailVaccination(String vaccinationID, String vaccineName, Date date, boolean confirmedByParent, String status, Student student) {
        this.vaccinationID = vaccinationID;
        this.vaccineName = vaccineName;
        this.date = date;
        this.confirmedByParent = confirmedByParent;
        this.status = status;
        this.student = student;
    }
    public String getVaccinationID() {
        return vaccinationID;
    }
    public void setVaccinationID(String vaccinationID) {
        this.vaccinationID = vaccinationID;
    }
    public String getVaccineName() {
        return vaccineName;
    }
    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public boolean isConfirmedByParent() {
        return confirmedByParent;
    }
    public void setConfirmedByParent(boolean confirmedByParent) {
        this.confirmedByParent = confirmedByParent;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Student getStudent() {
        return student;
    }
    public void setStudent(Student student) {
        this.student = student;
    }

    
}
