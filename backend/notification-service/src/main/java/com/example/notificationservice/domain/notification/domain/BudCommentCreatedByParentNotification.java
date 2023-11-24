package com.example.notificationservice.domain.notification.domain;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BudCommentCreatedByParentNotification extends ForestNotificationDetail {

    private UUID studentId;
    private UUID parentId;
    private UUID budId;
    private String budName;
    private String parentName;

    @Builder
    public BudCommentCreatedByParentNotification(UUID studentId, UUID parentId, UUID budId,
            String budName, String parentName) {
        this.studentId = studentId;
        this.parentId = parentId;
        this.budId = budId;
        this.budName = budName;
        this.parentName = parentName;
    }
}
