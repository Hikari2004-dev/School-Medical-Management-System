package com.school_medical.school_medical_management_system.repositories;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import java.util.List;
import java.util.Optional;

public interface IUserRepository {
    UserDetails findUserByEmail(String email);
    Optional<Appuser> findByAccountNumber(String accountNumber);
    Appuser getUserByEmail(String username);
    List<Appuser> getAllNurses();
}
