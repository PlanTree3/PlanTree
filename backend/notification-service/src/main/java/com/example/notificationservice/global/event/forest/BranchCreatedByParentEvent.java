package com.example.notificationservice.global.event.forest;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BranchCreatedByParentEvent extends ForestEvent {

    private ForestEventType type = ForestEventType.PAR_GEN_BRA;
    private UUID parentId;
    private UUID studentId;
    private UUID branchId;
    private String branchName;
}
