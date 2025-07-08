package com.school_medical.school_medical_management_system.repositories;

import org.springframework.security.core.userdetails.UserDetails;

public interface IUserRepository {
    UserDetails findUserByEmail(String email);
}
