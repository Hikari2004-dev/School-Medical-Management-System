package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
