package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "vaccination")
public class Vaccination {
    @Id
    @Column(name = "vaccination_id", nullable = false)
    private Integer id;

    @Column(name = "vaccine_name", length = 100)
    private String vaccineName;

    @Column(name = "vaccination_date")
    private LocalDate vaccinationDate;

    @Column(name = "status", length = 50)
    private String status;

    @Column(name = "confirmed")
    private Boolean confirmed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ColumnDefault("0")
    @Column(name = "declared_by_parent")
    private Boolean declaredByParent;

    @Column(name = "declared_date")
    private LocalDate declaredDate;

    @Lob
    @Column(name = "notes")
    private String notes;

}