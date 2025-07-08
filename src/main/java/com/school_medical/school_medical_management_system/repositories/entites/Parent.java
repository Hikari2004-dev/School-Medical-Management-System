package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

@Entity
@Table(name = "parent")
public class Parent {
    @Id
    @Column(name = "parent_id", nullable = false)
    private Integer id;

    @Column(name = "relationship", length = 50)
    private String relationship;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Appuser user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public Appuser getUser() {
        return user;
    }

    public void setUser(Appuser user) {
        this.user = user;
    }

}