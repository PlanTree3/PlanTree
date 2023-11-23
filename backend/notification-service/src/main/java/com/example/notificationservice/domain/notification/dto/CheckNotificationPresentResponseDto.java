package com.example.notificationservice.domain.notification.dto;

import lombok.Getter;

@Getter
public class CheckNotificationPresentResponseDto {

    private boolean notificationPresent;

    public CheckNotificationPresentResponseDto(boolean notificationPresent) {
        this.notificationPresent = notificationPresent;
    }
}
