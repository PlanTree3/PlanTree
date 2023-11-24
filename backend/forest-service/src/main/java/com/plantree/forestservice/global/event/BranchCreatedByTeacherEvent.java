package com.plantree.forestservice.global.event;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BranchCreatedByTeacherEvent extends ForestEventDetail {

    private UUID studentId;
    private UUID teacherId;
    private UUID branchId;
    private String branchName;

    @Builder
    public BranchCreatedByTeacherEvent(UUID teacherId, UUID studentId, UUID branchId,
            String branchName) {

        this.teacherId = teacherId;
        this.studentId = studentId;
        this.branchId = branchId;
        this.branchName = branchName;
    }
}
