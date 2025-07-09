package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "parentconsent")
public class Parentconsent {
    @Id
    @Column(name = "consent_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "parent_user_id", nullable = false)
    private Appuser parentUser;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "consent_type", length = 100)
    private String consentType;

    @Column(name = "consent_date")
    private LocalDate consentDate;

    @ColumnDefault("0")
    @Column(name = "status")
    private Boolean status;

}