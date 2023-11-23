package com.plantree.forestservice.global.event;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BudCommentCreatedByTeacherEvent extends ForestEventDetail {

    private UUID studentId;
    private UUID teacherId;
    private UUID budId;
    private String budName;

    @Builder
    public BudCommentCreatedByTeacherEvent(UUID teacherId, UUID studentId, UUID budId,
            String budName) {
        this.teacherId = teacherId;
        this.studentId = studentId;
        this.budId = budId;
        this.budName = budName;
    }
}
