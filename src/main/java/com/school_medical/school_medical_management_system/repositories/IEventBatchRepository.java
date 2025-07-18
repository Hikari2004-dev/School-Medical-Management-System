package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.repositories.entites.EventBatch;

import java.util.List;

public interface IEventBatchRepository {
    void createBatch(EventBatch batch);
    void approveBatch(Integer batchId);
    void resendBatch(Integer batchId);  // Thêm phương thức resend
    List<EventBatch> getAllBatches();
    EventBatch getBatchById(Integer batchId);
    List<EventBatch> findTop3UpcomingEvents();
}
