package com.school_medical.school_medical_management_system.services;


import com.school_medical.school_medical_management_system.repositories.UserRepository;
import com.school_medical.school_medical_management_system.repositories.entites.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
         User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),                       // Username
                user.getPassword(),                   // Password
                List.of(new SimpleGrantedAuthority(   // Authorities (role)
                        "ROLE_" + user.getRoleID().getRoleName()))
        );
    }
}
