package com.example.notificationservice.domain.notification.domain;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BranchCreatedByParentNotification extends ForestNotificationDetail {

    private UUID studentId;
    private UUID parentId;
    private UUID branchId;
    private String branchName;
    private String parentName;

    @Builder
    public BranchCreatedByParentNotification(UUID studentId, UUID parentId, UUID branchId,
            String branchName, String parentName) {
        this.studentId = studentId;
        this.parentId = parentId;
        this.branchId = branchId;
        this.branchName = branchName;
        this.parentName = parentName;
    }
}
