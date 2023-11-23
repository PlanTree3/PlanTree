package com.plantree.forestservice.global.event;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BranchCreatedByStudentEvent extends ForestEventDetail {

    private UUID studentId;
    private UUID branchId;
    private String branchName;

    @Builder
    public BranchCreatedByStudentEvent(UUID studentId, UUID branchId, String branchName) {
        this.studentId = studentId;
        this.branchId = branchId;
        this.branchName = branchName;
    }
}
