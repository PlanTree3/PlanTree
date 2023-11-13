package com.plantree.forestservice.domain.bud.domain;

import com.plantree.forestservice.global.config.webmvc.Role;
import com.plantree.forestservice.global.event.Event;
import com.plantree.forestservice.global.event.ForestEventType;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BudCommentCreatedEvent extends Event {

    private ForestEventType type;
    private UUID studentId;
    private UUID parentId;
    private UUID teacherId;
    private UUID budId;
    private String budName;

    @Builder
    public BudCommentCreatedEvent(UUID treeId, UUID memberId, Role role, UUID budId,
            String budName) {
        super(treeId);
        switch (role) {
            case STUDENT:
                this.studentId = memberId;
                this.type = ForestEventType.STU_WRI_BUD;
                break;
            case PARENT:
                this.parentId = memberId;
                this.type = ForestEventType.PAR_WRI_BUD;
                break;
            case TEACHER:
                this.teacherId = memberId;
                this.type = ForestEventType.TEA_WRI_BUD;
                break;
        }
        this.budId = budId;
        this.budName = budName;
    }
}
