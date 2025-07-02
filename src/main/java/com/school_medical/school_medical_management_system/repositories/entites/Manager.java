package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "manager")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ManagerID", nullable = false)
    private Integer id;

    @Column(name = "Class", length = 50)
    private String classField;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

    @OneToMany(mappedBy = "managerID")
    private Set<Studentlist> studentlists = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClassField() {
        return classField;
    }

    public void setClassField(String classField) {
        this.classField = classField;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public Set<Studentlist> getStudentlists() {
        return studentlists;
    }

    public void setStudentlists(Set<Studentlist> studentlists) {
        this.studentlists = studentlists;
    }

}