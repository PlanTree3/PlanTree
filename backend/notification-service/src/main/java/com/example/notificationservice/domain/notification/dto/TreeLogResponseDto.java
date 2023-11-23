package com.example.notificationservice.domain.notification.dto;

import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotificationDetail;
import com.example.notificationservice.domain.notification.domain.ForestNotificationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(Include.NON_NULL)
public class TreeLogResponseDto {

    private ForestNotificationType type;
    private String notificationId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    private UUID treeId;
    private ForestNotificationDetail detail;

    public TreeLogResponseDto(ForestNotification notification) {
        this.notificationId = notification.getId()
                                          .toString();
        this.type = notification.getType();
        this.createdAt = notification.getCreatedAt();
        this.treeId = notification.getTreeId();
        this.detail = notification.getDetail();
    }
}
