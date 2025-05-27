package com.school_medical.school_medical_management_system.repositories.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Roles")
public class Role {
    @Id
    @Column(name = "RoleID")
    private Long roleID;

    @Column(name = "RoleName", nullable = false)
    private String roleName;

    public Role() {
    }
 
    public Role(Long roleID, String roleName) {
        this.roleID = roleID;
        this.roleName = roleName;
    }


    public Long getRoleID() {
        return roleID;
    }

    public void setRoleID(Long roleID) {
        this.roleID = roleID;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    
}
