package com.example.notificationservice.domain.notification.domain;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BranchCreatedByStudentNotification extends ForestNotificationDetail {

    private UUID studentId;
    private UUID branchId;
    private String branchName;
    private String studentName;

    @Builder
    public BranchCreatedByStudentNotification(UUID studentId, UUID branchId, String branchName,
            String studentName) {
        this.studentId = studentId;
        this.branchId = branchId;
        this.branchName = branchName;
        this.studentName = studentName;
    }
}
