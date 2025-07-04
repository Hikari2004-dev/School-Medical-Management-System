package com.school_medical.school_medical_management_system.repositories.entites;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // 🆕 import
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "parent")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 🆕 dòng này
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ParentID", nullable = false)
    private Integer id;

    @Column(name = "Relationship", length = 50)
    private String relationship;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

    @OneToMany(mappedBy = "sentToParentID")
    private Set<Notification> notifications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "parentID")
    private Set<Providedservicelog> providedservicelogs = new LinkedHashSet<>();

    @OneToMany(mappedBy = "parentID")
    private Set<Student> students = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<Providedservicelog> getProvidedservicelogs() {
        return providedservicelogs;
    }

    public void setProvidedservicelogs(Set<Providedservicelog> providedservicelogs) {
        this.providedservicelogs = providedservicelogs;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

}