package com.example.notificationservice.domain.notification.domain;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BudCommentCreatedByStudentNotification extends ForestNotificationDetail {

    private UUID studentId;
    private UUID budId;
    private String budName;
    private String studentName;

    @Builder
    public BudCommentCreatedByStudentNotification(UUID studentId, UUID budId, String budName,
            String studentName) {
        this.studentId = studentId;
        this.budId = budId;
        this.budName = budName;
        this.studentName = studentName;
    }
}
