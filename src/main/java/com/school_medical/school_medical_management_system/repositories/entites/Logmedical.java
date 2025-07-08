package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "logmedical")
public class Logmedical {
    @Id
    @Column(name = "log_medical_id", nullable = false)
    private Integer id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "confirm")
    private Boolean confirm;

    @Column(name = "quantity")
    private Integer quantity;

    @Lob
    @Column(name = "introduction")
    private String introduction;

    @Lob
    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provided_service_log_id")
    private Providedservicelog providedServiceLog;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean getConfirm() {
        return confirm;
    }

    public void setConfirm(Boolean confirm) {
        this.confirm = confirm;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Providedservicelog getProvidedServiceLog() {
        return providedServiceLog;
    }

    public void setProvidedServiceLog(Providedservicelog providedServiceLog) {
        this.providedServiceLog = providedServiceLog;
    }

}