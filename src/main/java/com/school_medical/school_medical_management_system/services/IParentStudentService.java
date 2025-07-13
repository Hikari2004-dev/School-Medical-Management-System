package com.school_medical.school_medical_management_system.services;

public interface IParentStudentService {
    boolean isStudentBelongsToParent(int parentId, int studentId);
}
