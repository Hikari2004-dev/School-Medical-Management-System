package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

@Entity
@Table(name = "parent")
public class Parent {

    @Id
    @Column(name = "ParentID", nullable = false)
    private Integer parentId;

    @Column(name = "Relationship", length = 50)
    private String relationship;

    @Column(name = "UserID", nullable = false, insertable = false, updatable = false)
    private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
    private User user;

    // Getters and Setters

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
