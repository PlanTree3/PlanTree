package com.plantree.forestservice.domain.bud.domain;

import com.plantree.forestservice.global.event.Event;
import com.plantree.forestservice.global.event.ForestEventType;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BudCreatedEvent extends Event {

    private ForestEventType type;
    private UUID studentId;

    private UUID budId;
    private String budName;

    @Builder
    public BudCreatedEvent(UUID treeId, UUID studentId, UUID budId, String budName) {
        super(treeId);
        this.type = ForestEventType.STU_GEN_BUD;
        this.studentId = studentId;
        this.budId = budId;
        this.budName = budName;
    }
}
