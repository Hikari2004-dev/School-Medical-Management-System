package com.school_medical.school_medical_management_system.repositories.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class ClassEntity {
    @Id
    private String classID;

    @OneToMany(mappedBy = "classEntity")
    private List<Student> students;
}