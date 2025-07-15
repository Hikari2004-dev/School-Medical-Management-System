package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.repositories.impl.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Random;
import java.util.concurrent.CompletableFuture;

@Service
public class OTPService{

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JavaMailSender javaMailSender;

    public String generateOtp(String email) {
        String otp = generateRandomOtp();

        // Save OTP to the database
        String insertQuery = "INSERT INTO otp_info (user_id, otp, expiry_at) SELECT user_id, ?, ? FROM appuser WHERE email = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(insertQuery)) {

            Timestamp expiryTime = getOtpExpiryTime();
            stmt.setString(1, otp);
            stmt.setTimestamp(2, expiryTime);
            stmt.setString(3, email);
            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                sendOtpEmail(email, otp);
                return "OTP sent to your email!";
            } else {
                return "User with provided email not found!";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while saving OTP!";
        }
    }

    private String generateRandomOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);  // 6-digit OTP
        return String.valueOf(otp);
    }

    private Timestamp getOtpExpiryTime() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 10);  // OTP will expire in 10 minutes
        return new Timestamp(calendar.getTimeInMillis());
    }

    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP for password reset is: " + otp);
        javaMailSender.send(message);
    }
}
