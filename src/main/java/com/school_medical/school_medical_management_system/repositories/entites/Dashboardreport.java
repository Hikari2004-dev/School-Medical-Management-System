package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "dashboardreport")
public class Dashboardreport {
    @Id
    @Column(name = "report_id", nullable = false)
    private Integer id;

    @Column(name = "report_type", length = 50)
    private String reportType;

    @Lob
    @Column(name = "content")
    private String content;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "generated_date")
    private Instant generatedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "generated_by")
    private Appuser generatedBy;

}