package com.plantree.forestservice.global.event;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BranchCreatedByParentEvent extends ForestEventDetail {

    private UUID studentId;
    private UUID parentId;
    private UUID branchId;
    private String branchName;

    @Builder
    public BranchCreatedByParentEvent(UUID parentId, UUID studentId, UUID branchId,
            String branchName) {

        this.parentId = parentId;
        this.studentId = studentId;
        this.branchId = branchId;
        this.branchName = branchName;
    }
}
