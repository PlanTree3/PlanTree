package com.example.notificationservice.domain.notification.dto;

import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotificationDetail;
import com.example.notificationservice.domain.notification.domain.ForestNotificationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;

@Getter
public class NotificationResponseDto {

    private ForestNotificationType type;
    private boolean isRead;
    private String notificationId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    private UUID treeId;
    private ForestNotificationDetail detail;

    public NotificationResponseDto(ForestNotification notification, boolean isRead) {
        this.isRead = isRead;
        this.notificationId = notification.getId()
                                          .toString();
        this.type = notification.getType();
        this.createdAt = notification.getCreatedAt();
        this.treeId = notification.getTreeId();
        this.detail = notification.getDetail();
    }
}
