package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

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

    @Column(name = "date_sent")
    private Instant dateSent;

    @Column(name = "sent_by_user_id")
    private Integer sentByUserId;

    @Column(name = "confirmed")
    private Byte confirmed;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "sent_to_student_id")
    private Integer sentToStudentId;

    @Column(name = "sent_to_parent_id")
    private Integer sentToParentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

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

    public Byte getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Byte confirmed) {
        this.confirmed = confirmed;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSentToStudentId() {
        return sentToStudentId;
    }

    public void setSentToStudentId(Integer sentToStudentId) {
        this.sentToStudentId = sentToStudentId;
    }

    public Integer getSentToParentId() {
        return sentToParentId;
    }

    public void setSentToParentId(Integer sentToParentId) {
        this.sentToParentId = sentToParentId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}