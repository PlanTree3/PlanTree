package com.plantree.forestservice.domain.branch.domain;

import com.plantree.forestservice.global.config.webmvc.Role;
import com.plantree.forestservice.global.event.Event;
import com.plantree.forestservice.global.event.ForestEventType;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BranchCreatedEvent extends Event {

    private ForestEventType type;
    private UUID studentId;
    private UUID parentId;
    private UUID teacherId;
    private UUID branchId;
    private String branchName;

    @Builder
    public BranchCreatedEvent(UUID treeId, UUID memberId, Role role, UUID branchId,
            String branchName) {
        super(treeId);
        switch (role) {
            case STUDENT:
                this.studentId = memberId;
                this.type = ForestEventType.STU_GEN_BRA;
                break;
            case PARENT:
                this.parentId = memberId;
                this.type = ForestEventType.PAR_GEN_BRA;
                break;
            case TEACHER:
                this.teacherId = memberId;
                this.type = ForestEventType.TEA_GEN_BRA;
                break;
        }
        this.branchId = branchId;
        this.branchName = branchName;
    }
}
