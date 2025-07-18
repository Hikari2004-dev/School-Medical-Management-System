package com.school_medical.school_medical_management_system.services.impl;

import com.school_medical.school_medical_management_system.repositories.entites.Notification;
import com.school_medical.school_medical_management_system.repositories.impl.NotificationRepository;
import com.school_medical.school_medical_management_system.services.IAppUserService;
import com.school_medical.school_medical_management_system.services.INotificationService;
import com.school_medical.school_medical_management_system.utils.AuthUtils;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService implements INotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private IAppUserService appUserService;

    @Override
    public void sendConsentNotificationsForBatch(int batchId, String content, String type, String consentType) {
        notificationRepository.sendBatchNotifications(batchId, content, consentType);
    }

    @Override
    public void updateConsent(Long notificationId, Boolean consentStatus) {
        notificationRepository.updateConsentStatus(notificationId, consentStatus);
    }

    @Override
    public List<Notification> getNotificationsByParentId() {
        Integer parentUserId = appUserService.getUserByEmail(AuthUtils.getCurrentUserEmail()).getId();
        return notificationRepository.getNotificationsByParentId(parentUserId);
    }

    @Override
    public void sendNotificationToParent(String email, String notificationContent) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("Notification from School");
        helper.setText(notificationContent, true);  // Use true for HTML content
        javaMailSender.send(message);
    }


}
