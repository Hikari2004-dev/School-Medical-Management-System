package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "medicalappointment")
public class Medicalappointment {
    @Id
    @Column(name = "appointment_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nurse_id", nullable = false)
    private Appuser nurse;

    @Column(name = "appointment_date", nullable = false)
    private Instant appointmentDate;

    @Lob
    @Column(name = "reason")
    private String reason;

    @Column(name = "status", length = 50)
    private String status;

}