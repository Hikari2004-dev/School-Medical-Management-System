package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.config.JwtUtil;
import com.school_medical.school_medical_management_system.repositories.IUserRepository;
import com.school_medical.school_medical_management_system.repositories.entites.Appuser;
import com.school_medical.school_medical_management_system.repositories.entites.StudentParent;
import com.school_medical.school_medical_management_system.services.impl.CustomUserDetailsService;
import com.school_medical.school_medical_management_system.services.IAppUserService;
import com.school_medical.school_medical_management_system.services.IStudentParentService;
import com.school_medical.school_medical_management_system.utils.AuthUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private IAppUserService appUserService;

    private AuthUtils authUtils;


    @PostMapping("/login")
    public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        // Lấy thông tin người dùng từ appUserService
        Appuser user = appUserService.getUserByEmail(authRequest.getEmail());
        String name = user.getFirstName();
        String role = user.getRoleName();
        return ResponseEntity.ok(new AuthResponse(jwt, name, role));
    }

    @Autowired
    private IStudentParentService studentParentService;

    @GetMapping("/my-children")
    public ResponseEntity<List<StudentParent>> getMyChildren() {
        List<StudentParent> list = studentParentService.getStudentInfoByParentId(appUserService.getUserByEmail(AuthUtils.getCurrentUserEmail()).getId());
        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User user) {
        String email = user.getUsername();
        Collection<? extends GrantedAuthority> roles = user.getAuthorities();

        return ResponseEntity.ok("Email: " + email + ", Roles: " + roles);
    }
}

@Data
class AuthRequest {
    private String email;
    private String password;
}

@Data
@AllArgsConstructor
class AuthResponse {
    private String jwt;
    private String name;
    private String role;
}

