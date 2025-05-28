package com.school_medical.school_medical_management_system.repositories.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "StudentList")
public class StudentList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    @Column(name = "Room", nullable = false)
    private String room;

    @OneToMany(mappedBy = "classEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Student> students;

    @ManyToOne
    @JoinColumn(name = "TeacherID", nullable = false)
    private Teacher teacher;

    public StudentList() {
    }

    public StudentList(Long classId, String room, List<Student> students, Teacher teacher) {
        this.classId = classId;
        this.room = room;
        this.students = students;
        this.teacher = teacher;
    }

    public Long getClassid() {
        return classId;
    }

    public void setClassid(Long classId) {
        this.classId = classId;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    
    
    
}
