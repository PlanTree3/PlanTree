package com.example.notificationservice.domain.notification.dto;

import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class CheckNotificationPresentResponseDto {

    private boolean notificationPresent;

    public CheckNotificationPresentResponseDto(List<Map<Object, Object>> notificationList) {
        if (notificationList == null) {
            this.notificationPresent = false;
            return;
        }
        this.notificationPresent = notificationList.stream()
                                                   .anyMatch(map -> map.get("isRead")
                                                                       .equals(false));
    }
}
