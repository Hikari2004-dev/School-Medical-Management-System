package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "report")
public class Report {
    @Id
    @Column(name = "report_id", nullable = false)
    private Integer id;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @Column(name = "generated_by_user_id")
    private Integer generatedByUserId;

    @Lob
    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getGeneratedByUserId() {
        return generatedByUserId;
    }

    public void setGeneratedByUserId(Integer generatedByUserId) {
        this.generatedByUserId = generatedByUserId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}