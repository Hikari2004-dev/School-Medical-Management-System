package com.school_medical.school_medical_management_system.services;

import java.util.List;

public interface IParentStudentService {
    boolean isStudentBelongsToParent(int parentId, int studentId);
    List<Integer> getStudentIdsByParentId(int parentUserId);
}
