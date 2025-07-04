package com.school_medical.school_medical_management_system.repositories.entites;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 🆕 dòng này
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false)
    private Integer id;

    @Column(name = "FirstName", length = 100)
    private String firstName;

    @Column(name = "LastName", length = 100)
    private String lastName;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "Password")
    private String password;

    @Column(name = "Phone", length = 20)
    private String phone;

    @Column(name = "Address")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RoleID")
    private Role roleID;

    @OneToMany(mappedBy = "userID")
    private Set<Headmaster> headmasters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userID")
    private Set<Manager> managers = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userID")
    private Set<Notification> notifications = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userID")
    private Set<Parent> parents = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userID")
    private Set<Report> reports = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userID")
    private Set<Schoolnurse> schoolnurses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userID")
    private Set<Student> students = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Role getRoleID() {
        return roleID;
    }

    public void setRoleID(Role roleID) {
        this.roleID = roleID;
    }

    public Set<Headmaster> getHeadmasters() {
        return headmasters;
    }

    public void setHeadmasters(Set<Headmaster> headmasters) {
        this.headmasters = headmasters;
    }

    public Set<Manager> getManagers() {
        return managers;
    }

    public void setManagers(Set<Manager> managers) {
        this.managers = managers;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<Parent> getParents() {
        return parents;
    }

    public void setParents(Set<Parent> parents) {
        this.parents = parents;
    }

    public Set<Report> getReports() {
        return reports;
    }

    public void setReports(Set<Report> reports) {
        this.reports = reports;
    }

    public Set<Schoolnurse> getSchoolnurses() {
        return schoolnurses;
    }

    public void setSchoolnurses(Set<Schoolnurse> schoolnurses) {
        this.schoolnurses = schoolnurses;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

}
