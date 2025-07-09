package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "medicalcheckup")
public class Medicalcheckup {
    @Id
    @Column(name = "checkup_id", nullable = false)
    private Integer id;

    @Column(name = "checkup_date")
    private LocalDate checkupDate;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "status", length = 50)
    private String status;

    @Column(name = "need_follow_up")
    private Boolean needFollowUp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

}