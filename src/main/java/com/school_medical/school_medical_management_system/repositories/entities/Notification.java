package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationID;

    private String type;
    private String content;

    @Column(name = "dateSent")
    private LocalDateTime dateSent;

    private boolean confirmed;

    @ManyToOne
    @JoinColumn(name = "sentByUserID")
    private User sentByUser;

    @ManyToOne
    @JoinColumn(name = "sentToStudentID")
    private Student sentToStudent;

    @ManyToOne
    @JoinColumn(name = "sentToParentID")
    private Parent sentToParent;

    public Notification() {
    }

    public Notification(Long notificationID, String type, String content, LocalDateTime dateSent, boolean confirmed,
                        User sentByUser, Student sentToStudent, Parent sentToParent) {
        this.notificationID = notificationID;
        this.type = type;
        this.content = content;
        this.dateSent = dateSent;
        this.confirmed = confirmed;
        this.sentByUser = sentByUser;
        this.sentToStudent = sentToStudent;
        this.sentToParent = sentToParent;
    }

    public Long getNotificationID() {
        return notificationID;
    }

    public void setNotificationID(Long notificationID) {
        this.notificationID = notificationID;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDateSent() {
        return dateSent;
    }

    public void setDateSent(LocalDateTime dateSent) {
        this.dateSent = dateSent;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public User getSentByUser() {
        return sentByUser;
    }

    public void setSentByUser(User sentByUser) {
        this.sentByUser = sentByUser;
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
}
