package com.example.notificationservice.global.event.forest;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BranchCreatedByTeacherEvent extends ForestEvent {

    private ForestEventType type = ForestEventType.TEA_GEN_BRA;
    private UUID teacherId;
    private UUID studentId;
    private UUID branchId;
    private String branchName;

}
