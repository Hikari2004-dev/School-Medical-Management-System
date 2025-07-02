package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NotificationID", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "Content")
    private String content;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "DateSent")
    private Instant dateSent;

    @Column(name = "SentByUserID")
    private Integer sentByUserID;

    @Column(name = "Confirmed")
    private Boolean confirmed;

    @Column(name = "Type", length = 50)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SentToStudentID")
    private Student sentToStudentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SentToParentID")
    private Parent sentToParentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private User userID;

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

    public Integer getSentByUserID() {
        return sentByUserID;
    }

    public void setSentByUserID(Integer sentByUserID) {
        this.sentByUserID = sentByUserID;
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

    public Student getSentToStudentID() {
        return sentToStudentID;
    }

    public void setSentToStudentID(Student sentToStudentID) {
        this.sentToStudentID = sentToStudentID;
    }

    public Parent getSentToParentID() {
        return sentToParentID;
    }

    public void setSentToParentID(Parent sentToParentID) {
        this.sentToParentID = sentToParentID;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

}