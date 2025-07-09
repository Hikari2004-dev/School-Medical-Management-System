package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "healthinfo")
public class Healthinfo {
    @Id
    @Column(name = "health_info_id", nullable = false)
    private Integer id;

    @Column(name = "allergy")
    private String allergy;

    @Column(name = "chronic_disease")
    private String chronicDisease;

    @Column(name = "vision", length = 50)
    private String vision;

    @Column(name = "hearing", length = 50)
    private String hearing;

    @Lob
    @Column(name = "medical_history")
    private String medicalHistory;

    @Column(name = "height")
    private Float height;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "bmi")
    private Float bmi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

}