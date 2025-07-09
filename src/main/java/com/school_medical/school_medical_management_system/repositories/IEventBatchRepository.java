package com.school_medical.school_medical_management_system.repositories;

import com.school_medical.school_medical_management_system.models.ApprovalRequest;
import com.school_medical.school_medical_management_system.repositories.entites.EventBatch;

import java.util.List;

public interface IEventBatchRepository {
    void createBatch(EventBatch batch);
    void approveBatch(Integer batchId);
    List<EventBatch> getAllBatches();
    EventBatch getBatchById(Integer batchId);
}
