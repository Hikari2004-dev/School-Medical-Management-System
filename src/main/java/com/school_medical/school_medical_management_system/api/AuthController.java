package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.config.JwtProvider;
import com.school_medical.school_medical_management_system.models.AuthResponse;
import com.school_medical.school_medical_management_system.models.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class AuthController {
    @Autowired AuthenticationManager authenticationManager;
    @Autowired JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request, request.getPassword())
        );

        String jwt = jwtProvider.generateToken(auth);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}
