package com.school_medical.school_medical_management_system.repositories.entities.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.school_medical.school_medical_management_system.repositories.entities.report.Notification;
import com.school_medical.school_medical_management_system.repositories.entities.student.Student;

@Entity
@Table(name = "users")
public class User {

    @Id
    private Long userID;

    @Column(name = "FirstName", nullable = false)
    private String firstName;

    @Column(name = "LastName", nullable = false)
    private String lastName;
    
    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Address")
    private String address;

    @Column(name = "Phone", nullable = false)
    private String phone;

    @Column(name = "Password", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    private Role role;

    @OneToOne(mappedBy = "user")
    private Parent parent;

    @OneToOne(mappedBy = "user")
    private Headmaster headmaster;

    @OneToOne(mappedBy = "user")
    @JsonBackReference
    private Teacher teacher;

    @OneToOne(mappedBy = "user")
    private Student student;

    @OneToOne(mappedBy = "user")
    private SchoolNurse nurse;

    @OneToOne(mappedBy = "user")
    private Report report;

    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;

    public User() {}

    public User(Long userID, String firstName, String lastName, String email, String address,
                String phone, String password, Role role) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.password = password;
        this.role = role;
    }

    
    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
