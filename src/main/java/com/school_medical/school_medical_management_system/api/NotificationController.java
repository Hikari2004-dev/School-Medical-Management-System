package com.school_medical.school_medical_management_system.api;

import com.school_medical.school_medical_management_system.models.ConsentResponse;
import com.school_medical.school_medical_management_system.models.NotificationRequest;
import com.school_medical.school_medical_management_system.repositories.entites.Notification;
import com.school_medical.school_medical_management_system.services.impl.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send-batch/{batchId}")
    public ResponseEntity<String> sendBatchNotifications(@PathVariable int batchId, @RequestBody NotificationRequest request) {
        try {
            notificationService.sendConsentNotificationsForBatch(batchId, request.getContent(), request.getType(), request.getConsentType());
            return ResponseEntity.ok("Notifications sent successfully for batch ID: " + batchId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send notifications: " + e.getMessage());
        }
    }

    @PostMapping("/consent/{notificationId}")
    public ResponseEntity<String> updateConsent(@PathVariable Long notificationId,
                                                @RequestBody ConsentResponse response) {
        try {
            notificationService.updateConsent(notificationId, response.getConsentStatus());
            return ResponseEntity.ok("Consent updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update consent: " + e.getMessage());
        }
    }

    @GetMapping("/parent")
    public ResponseEntity<List<Notification>> getNotificationsByParent() {
        List<Notification> notifications = notificationService.getNotificationsByParentId();
        return ResponseEntity.ok(notifications);
    }
}
