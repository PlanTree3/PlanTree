package com.example.notificationservice.domain.notification.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class NotificationBoxResponseDto {

    private List<NotificationResponseDto> notifications;

    public NotificationBoxResponseDto(List<NotificationResponseDto> notifications) {
        this.notifications = notifications;
    }
}
