package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StudentID", nullable = false)
    private Integer id;

    @Column(name = "Name", length = 100)
    private String name;

    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "Gender", length = 10)
    private String gender;

    @Column(name = "Grade", length = 20)
    private String grade;

    @Column(name = "HealthInfoID")
    private Integer healthInfoID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentID")
    private Parent parentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ClassID")
    private Studentlist classID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProvidedServiceLogID")
    private Providedservicelog providedServiceLogID;

    @OneToMany(mappedBy = "studentID")
    private Set<Detailvaccination> detailvaccinations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "studentID")
    private Set<Healthinfo> healthinfos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "studentID")
    private Set<Incidentreport> incidentreports = new LinkedHashSet<>();

    @OneToMany(mappedBy = "studentID")
    private Set<Medicalcheckup> medicalcheckups = new LinkedHashSet<>();

    @OneToMany(mappedBy = "sentToStudentID")
    private Set<Notification> notifications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "studentID")
    private Set<Schoolnurse> schoolnurses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "studentID")
    private Set<Studentevent> studentevents = new LinkedHashSet<>();

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

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Integer getHealthInfoID() {
        return healthInfoID;
    }

    public void setHealthInfoID(Integer healthInfoID) {
        this.healthInfoID = healthInfoID;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public Parent getParentID() {
        return parentID;
    }

    public void setParentID(Parent parentID) {
        this.parentID = parentID;
    }

    public Studentlist getClassID() {
        return classID;
    }

    public void setClassID(Studentlist classID) {
        this.classID = classID;
    }

    public Providedservicelog getProvidedServiceLogID() {
        return providedServiceLogID;
    }

    public void setProvidedServiceLogID(Providedservicelog providedServiceLogID) {
        this.providedServiceLogID = providedServiceLogID;
    }

    public Set<Detailvaccination> getDetailvaccinations() {
        return detailvaccinations;
    }

    public void setDetailvaccinations(Set<Detailvaccination> detailvaccinations) {
        this.detailvaccinations = detailvaccinations;
    }

    public Set<Healthinfo> getHealthinfos() {
        return healthinfos;
    }

    public void setHealthinfos(Set<Healthinfo> healthinfos) {
        this.healthinfos = healthinfos;
    }

    public Set<Incidentreport> getIncidentreports() {
        return incidentreports;
    }

    public void setIncidentreports(Set<Incidentreport> incidentreports) {
        this.incidentreports = incidentreports;
    }

    public Set<Medicalcheckup> getMedicalcheckups() {
        return medicalcheckups;
    }

    public void setMedicalcheckups(Set<Medicalcheckup> medicalcheckups) {
        this.medicalcheckups = medicalcheckups;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<Schoolnurse> getSchoolnurses() {
        return schoolnurses;
    }

    public void setSchoolnurses(Set<Schoolnurse> schoolnurses) {
        this.schoolnurses = schoolnurses;
    }

    public Set<Studentevent> getStudentevents() {
        return studentevents;
    }

    public void setStudentevents(Set<Studentevent> studentevents) {
        this.studentevents = studentevents;
    }

}