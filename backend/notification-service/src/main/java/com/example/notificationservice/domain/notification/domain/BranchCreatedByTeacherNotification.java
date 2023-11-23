package com.example.notificationservice.domain.notification.domain;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BranchCreatedByTeacherNotification extends ForestNotificationDetail {

    private UUID studentId;
    private UUID teacherId;
    private UUID branchId;
    private String branchName;
    private String teacherName;

    @Builder
    public BranchCreatedByTeacherNotification(UUID studentId, UUID teacherId, UUID branchId,
            String branchName, String teacherName) {
        this.studentId = studentId;
        this.teacherId = teacherId;
        this.branchId = branchId;
        this.branchName = branchName;
        this.teacherName = teacherName;
    }
}
