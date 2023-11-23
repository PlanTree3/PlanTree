package com.plantree.forestservice.global.event;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BudCommentCreatedByParentEvent extends ForestEventDetail {

    private UUID studentId;
    private UUID parentId;
    private UUID budId;
    private String budName;

    @Builder
    public BudCommentCreatedByParentEvent(UUID parentId, UUID studentId, UUID budId,
            String budName) {
        this.parentId = parentId;
        this.studentId = studentId;
        this.budId = budId;
        this.budName = budName;
    }
}
