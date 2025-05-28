package com.school_medical.school_medical_management_system.repositories.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "MedicalEvent")
public class MedicalEvent {

    @Id
    private String EventID;

    @Column(name = "Description", nullable = false)
    private String Description;

    @Column(name = "eventDate", nullable = false)
    private String eventDate;

    @Column(name = "HeadmasterID", nullable = false)
    private String headmasterID;

    @Column(name = "Datetime", nullable = false)
    private String datetime;

    @OneToMany(mappedBy = "medicalEvent")
    private List<Student> students;

    @OneToMany(mappedBy = "medicalEvent")
    private List<SchoolNurse> schoolNurses;

    @OneToMany(mappedBy = "EventID")
    private List<MedicalSupplies> medicalSupplies;

    @OneToMany(mappedBy = "EventID")
    private List<MedicalCheckup> medicalCheckups;

    public MedicalEvent() {
    }

    public MedicalEvent(String eventID, String description, String eventDate, String headmasterID, String datetime) {
        this.EventID = eventID;
        this.Description = description;
        this.eventDate = eventDate;
        this.headmasterID = headmasterID;
        this.datetime = datetime;
    }

    public String getEventID() {
        return EventID;
    }

    public void setEventID(String eventID) {
        EventID = eventID;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getHeadmasterID() {
        return headmasterID;
    }

    public void setHeadmasterID(String headmasterID) {
        this.headmasterID = headmasterID;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<SchoolNurse> getSchoolNurses() {
        return schoolNurses;
    }

    public void setSchoolNurses(List<SchoolNurse> schoolNurses) {
        this.schoolNurses = schoolNurses;
    }

    public List<MedicalSupplies> getMedicalSupplies() {
        return medicalSupplies;
    }

    public void setMedicalSupplies(List<MedicalSupplies> medicalSupplies) {
        this.medicalSupplies = medicalSupplies;
    }

    
}
