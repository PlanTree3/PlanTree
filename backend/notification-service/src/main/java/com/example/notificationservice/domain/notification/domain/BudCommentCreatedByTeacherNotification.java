package com.example.notificationservice.domain.notification.domain;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BudCommentCreatedByTeacherNotification extends ForestNotificationDetail {

    private UUID studentId;
    private UUID teacherId;
    private UUID budId;
    private String budName;
    private String teacherName;

    @Builder
    public BudCommentCreatedByTeacherNotification(UUID studentId, UUID teacherId, UUID budId,
            String budName, String teacherName) {
        this.studentId = studentId;
        this.teacherId = teacherId;
        this.budId = budId;
        this.budName = budName;
        this.teacherName = teacherName;
    }
}
