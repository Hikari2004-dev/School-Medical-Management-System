package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

@Entity
@Table(name = "studentlist")
public class Studentlist {
    @Id
    @Column(name = "ClassID", nullable = false)
    private Integer id;

    @Column(name = "Room", length = 50)
    private String room;

    @Column(name = "StudentID")
    private Integer studentID;

    @Column(name = "TeacherID")
    private Integer teacherID;

    @Column(name = "StudentName", length = 100)
    private String studentName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ManagerID")
    private Manager managerID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Integer getStudentID() {
        return studentID;
    }

    public void setStudentID(Integer studentID) {
        this.studentID = studentID;
    }

    public Integer getTeacherID() {
        return teacherID;
    }

    public void setTeacherID(Integer teacherID) {
        this.teacherID = teacherID;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Manager getManagerID() {
        return managerID;
    }

    public void setManagerID(Manager managerID) {
        this.managerID = managerID;
    }

}