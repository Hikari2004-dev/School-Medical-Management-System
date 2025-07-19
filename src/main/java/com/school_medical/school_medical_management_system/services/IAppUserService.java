package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import org.springframework.security.core.userdetails.User;

public interface IAppUserService {
    public Appuser getUserByEmail(String email);
}
