package com.plantree.forestservice.global.event;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BudCompletedEvent extends ForestEventDetail {

    private UUID studentId;
    private UUID budId;
    private String budName;

    @Builder
    public BudCompletedEvent(UUID studentId, UUID budId, String budName) {
        this.studentId = studentId;
        this.budId = budId;
        this.budName = budName;
    }
}
