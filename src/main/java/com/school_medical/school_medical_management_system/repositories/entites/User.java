    package com.school_medical.school_medical_management_system.repositories.entites;

    import jakarta.persistence.*;

    import java.util.LinkedHashSet;
    import java.util.Set;

    @Entity
    @Table(name = "user")
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "user_id")
        private Integer userId;

        @Column(name = "first_name", nullable = false, length = 100)
        private String firstName;

        @Column(name = "last_name", nullable = false, length = 100)
        private String lastName;

        @Column(name = "email", nullable = false, length = 100)
        private String email;

        @Column(name = "password", nullable = false, length = 100)
        private String password;

        @Column(name = "phone", nullable = false, length = 20)
        private String phone;

        @Column(name = "address", nullable = false)
        private String address;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "role_id", nullable = false)
        private Role role;

        @OneToMany(mappedBy = "user")
        private Set<Admin> admins = new LinkedHashSet<>();

        @OneToMany(mappedBy = "user")
        private Set<Headmaster> headmasters = new LinkedHashSet<>();

        @OneToMany(mappedBy = "user")
        private Set<Notification> notifications = new LinkedHashSet<>();

        @OneToMany(mappedBy = "user")
        private Set<Parent> parents = new LinkedHashSet<>();

        @OneToMany(mappedBy = "user")
        private Set<Report> reports = new LinkedHashSet<>();

        @OneToMany(mappedBy = "user")
        private Set<SchoolNurse> schoolNurses = new LinkedHashSet<>();

        @OneToMany(mappedBy = "user")
        private Set<Student> students = new LinkedHashSet<>();

        // ✅ Sửa lại getter/setter
        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
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

        public Role getRole() {
            return role;
        }

        public void setRole(Role role) {
            this.role = role;
        }

        public Set<Admin> getAdmins() {
            return admins;
        }

        public void setAdmins(Set<Admin> admins) {
            this.admins = admins;
        }

        public Set<Headmaster> getHeadmasters() {
            return headmasters;
        }

        public void setHeadmasters(Set<Headmaster> headmasters) {
            this.headmasters = headmasters;
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

        public Set<SchoolNurse> getSchoolNurses() {
            return schoolNurses;
        }

        public void setSchoolNurses(Set<SchoolNurse> schoolNurses) {
            this.schoolNurses = schoolNurses;
        }

        public Set<Student> getStudents() {
            return students;
        }

        public void setStudents(Set<Student> students) {
            this.students = students;
        }
    }
