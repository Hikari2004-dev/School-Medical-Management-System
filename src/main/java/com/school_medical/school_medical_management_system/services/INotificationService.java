package com.school_medical.school_medical_management_system.services;

import com.school_medical.school_medical_management_system.repositories.entites.Notification;

import java.util.List;

public interface INotificationService {
    public void sendConsentNotificationsForBatch(int batchId, String content, String type, String consentType);
    void updateConsent(Long notificationId, Boolean consentStatus);
    List<Notification> getNotificationsByParentId();
}
