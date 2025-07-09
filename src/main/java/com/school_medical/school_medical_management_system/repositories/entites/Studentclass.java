package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "studentclass")
public class Studentclass {
    @Id
    @Column(name = "class_id", nullable = false)
    private Integer id;

    @Column(name = "class_name", length = 50)
    private String className;

    @Column(name = "room", length = 50)
    private String room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Appuser manager;

}