package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

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

    @Column(name = "sent_by_user_id")
    private Integer sentByUserId;

    @Column(name = "confirmed")
    private Boolean confirmed;

    @Column(name = "type", length = 50)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sent_to_student_id")
    private Student sentToStudent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sent_to_parent_id")
    private Parent sentToParent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Appuser user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDateSent() {
        return dateSent;
    }

    public void setDateSent(Instant dateSent) {
        this.dateSent = dateSent;
    }

    public Integer getSentByUserId() {
        return sentByUserId;
    }

    public void setSentByUserId(Integer sentByUserId) {
        this.sentByUserId = sentByUserId;
    }

    public Boolean getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Student getSentToStudent() {
        return sentToStudent;
    }

    public void setSentToStudent(Student sentToStudent) {
        this.sentToStudent = sentToStudent;
    }

    public Parent getSentToParent() {
        return sentToParent;
    }

    public void setSentToParent(Parent sentToParent) {
        this.sentToParent = sentToParent;
    }

    public Appuser getUser() {
        return user;
    }

    public void setUser(Appuser user) {
        this.user = user;
    }

}