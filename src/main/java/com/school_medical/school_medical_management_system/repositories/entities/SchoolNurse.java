package com.school_medical.school_medical_management_system.repositories.entities;


import jakarta.persistence.*;

import java.util.List;

@Entity
public class SchoolNurse {
    @Id
    private String NurseID;

    @Column(name = "UserID" , nullable = false)
    private String userID;

    @Column(name = "MedicalID" , nullable = false)
    private String medicalID;

    @Column(name = "EventID", nullable = false)
    private String eventID;

}
