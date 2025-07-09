package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "medicalevent")
public class Medicalevent {
    @Id
    @Column(name = "event_id", nullable = false)
    private Integer id;

    @Column(name = "event_type", length = 50)
    private String eventType;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Lob
    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nurse_id")
    private Appuser nurse;

    @ColumnDefault("'Pending'")
    @Column(name = "status", length = 50)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private Appuser approvedBy;

}