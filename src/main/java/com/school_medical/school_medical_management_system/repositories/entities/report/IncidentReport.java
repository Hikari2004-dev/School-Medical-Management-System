package com.school_medical.school_medical_management_system.repositories.entities.report;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.school_medical.school_medical_management_system.repositories.entities.User.SchoolNurse;
import com.school_medical.school_medical_management_system.repositories.entities.student.Student;

import jakarta.persistence.Column;

@Entity
@Table(name = "IncidentReport")
public class IncidentReport {

    @Id
    private Long IncidentID;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "studentID", nullable = false)
    private String StudentID ;

    @Column(name = "type", nullable = false)
    private String Type;

    @Column(name = "nurseID", nullable = false)
    private String NurseID ;

    @Column(name = "Date", nullable = false)
    private String Date;

    @ManyToOne 
    @JoinColumn(name = "NurseID", insertable = false, updatable = false)
    private SchoolNurse nurse;
    
    @OneToMany
    @JoinColumn(name = "IncidentID", referencedColumnName = "IncidentID")
    private IncidentSupplies incidentSupplies;

    @ManyToOne
    @JoinColumn(name = "StudentId", insertable = false, updatable = false)
    private Student student;
    


    public IncidentReport() {
    }

    public IncidentReport(Long incidentID, String description, String studentID, String type, String nurseID, String date) {
        this.IncidentID = incidentID;
        this.description = description;
        this.StudentID = studentID;
        this.Type = type;
        this.NurseID = nurseID;
        this.Date = date;
    }

    public Long getIncidentID() {
        return IncidentID;
    }

    public void setIncidentID(Long incidentID) {
        IncidentID = incidentID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStudentID() {
        return StudentID;
    }

    public void setStudentID(String studentID) {
        StudentID = studentID;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public String getNurseID() {
        return NurseID;
    }

    public void setNurseID(String nurseID) {
        NurseID = nurseID;
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public SchoolNurse getNurse() {
        return nurse;
    }

    public void setNurse(SchoolNurse nurse) {
        this.nurse = nurse;
    }

    public IncidentSupplies getIncidentSupplies() {
        return incidentSupplies;
    }

    public void setIncidentSupplies(IncidentSupplies incidentSupplies) {
        this.incidentSupplies = incidentSupplies;
    }

    
}
