package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @Column(name = "notification_id", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "content")
    private String content;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "date_sent")
    private Instant dateSent;

    @Column(name = "confirmed")
    private Boolean confirmed;

    @Column(name = "type", length = 50)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_user_id")
    private Appuser parentUser;

}