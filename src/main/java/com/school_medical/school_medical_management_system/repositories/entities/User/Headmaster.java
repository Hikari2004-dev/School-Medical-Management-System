package com.school_medical.school_medical_management_system.repositories.entities.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;

import com.school_medical.school_medical_management_system.repositories.entities.medical.MedicalEvent;

@Entity
@Table(name = "headmasters")
public class Headmaster {
    @Id
    private String headmasterID;

    @OneToOne
    @JoinColumn(name = "userID")
    private User user;

    @OneToMany(mappedBy = "headmaster")
    private List<MedicalEvent> medicalEvents;


}
