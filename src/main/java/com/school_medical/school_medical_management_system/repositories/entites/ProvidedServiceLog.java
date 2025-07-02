package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "providedservicelog")
public class Providedservicelog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProvidedServiceLogID", nullable = false)
    private Integer id;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "Timestamp")
    private Instant timestamp;

    @Column(name = "NameType", length = 100)
    private String nameType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentID")
    private Parent parentID;

    @Column(name = "StudentID")
    private Integer studentID;

    @Column(name = "NurseID")
    private Integer nurseID;

    @OneToMany(mappedBy = "providedServiceLogID")
    private Set<Appointment> appointments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "providedServiceLogID")
    private Set<Logmedical> logmedicals = new LinkedHashSet<>();

    @OneToMany(mappedBy = "providedServiceLogID")
    private Set<Schoolnurse> schoolnurses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "providedServiceLogID")
    private Set<Student> students = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getNameType() {
        return nameType;
    }

    public void setNameType(String nameType) {
        this.nameType = nameType;
    }

    public Parent getParentID() {
        return parentID;
    }

    public void setParentID(Parent parentID) {
        this.parentID = parentID;
    }

    public Integer getStudentID() {
        return studentID;
    }

    public void setStudentID(Integer studentID) {
        this.studentID = studentID;
    }

    public Integer getNurseID() {
        return nurseID;
    }

    public void setNurseID(Integer nurseID) {
        this.nurseID = nurseID;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    public Set<Logmedical> getLogmedicals() {
        return logmedicals;
    }

    public void setLogmedicals(Set<Logmedical> logmedicals) {
        this.logmedicals = logmedicals;
    }

    public Set<Schoolnurse> getSchoolnurses() {
        return schoolnurses;
    }

    public void setSchoolnurses(Set<Schoolnurse> schoolnurses) {
        this.schoolnurses = schoolnurses;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

}