package com.example.notificationservice.domain.notification.application.repository;

import com.example.notificationservice.domain.notification.domain.ForestNotification;
import java.util.List;
import java.util.UUID;

public interface ForestNotificationRepository {

    ForestNotification save(ForestNotification forestNotification);

    List<ForestNotification> findByTreeId(UUID treeId);

    List<ForestNotification> findByIdIn(List<String> ids);
}
