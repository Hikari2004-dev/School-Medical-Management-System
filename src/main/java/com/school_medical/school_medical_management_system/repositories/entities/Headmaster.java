package com.school_medical.school_medical_management_system.repositories.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;



@Entity
public class Headmaster {
    @Id
    private String headmasterID;

    @OneToOne
    @JoinColumn(name = "userID")
    private User user;
}
