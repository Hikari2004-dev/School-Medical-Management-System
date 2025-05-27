package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.*;

@Entity
public class StudentList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String room;

    @ManyToOne
    @JoinColumn(name = "StudentID", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "TeacherID", nullable = false)
    private teacher teacher;

    public StudentList() {
    }

    public StudentList(String room, Student student, teacher teacher) {
        this.room = room;
        this.student = student;
        this.teacher = teacher;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(teacher teacher) {
        this.teacher = teacher;
    }
}
