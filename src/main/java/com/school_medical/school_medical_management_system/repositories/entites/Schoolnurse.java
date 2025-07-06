package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

@Entity
@Table(name = "schoolnurse")
public class Schoolnurse {
    @Id
    @Column(name = "nurse_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Appuser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provided_service_log_id")
    private Providedservicelog providedServiceLog;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Appuser getUser() {
        return user;
    }

    public void setUser(Appuser user) {
        this.user = user;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Providedservicelog getProvidedServiceLog() {
        return providedServiceLog;
    }

    public void setProvidedServiceLog(Providedservicelog providedServiceLog) {
        this.providedServiceLog = providedServiceLog;
    }

}