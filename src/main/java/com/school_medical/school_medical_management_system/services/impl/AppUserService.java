package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.repositories.IUserRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import com.school_medical.school_medical_management_system.services.IAppUserService;
import com.school_medical.school_medical_management_system.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppUserService implements IAppUserService {
    @Autowired
    private IUserRepository userRepository;

    private AuthUtils authUtils;

    @Override
    public Appuser getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }
}
