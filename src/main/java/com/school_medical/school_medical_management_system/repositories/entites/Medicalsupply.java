package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "medicalsupply")
public class Medicalsupply {
    @Id
    @Column(name = "supply_id", nullable = false)
    private Integer id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "last_checked_date")
    private LocalDate lastCheckedDate;

}