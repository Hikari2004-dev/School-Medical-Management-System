package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import org.springframework.security.core.userdetails.UserDetails;

public interface IUserRepository {
    UserDetails findUserByEmail(String email);

    Appuser getUserByEmail(String username);
}
