package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "medicalfollowup")
public class Medicalfollowup {
    @Id
    @Column(name = "followup_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Medicalevent event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vaccination_id")
    private Vaccination vaccination;

    @Column(name = "followup_date")
    private LocalDate followupDate;

    @Lob
    @Column(name = "notes")
    private String notes;

    @Column(name = "status", length = 50)
    private String status;

}