package com.example.notificationservice.domain.notification.application.repository;

import com.example.notificationservice.domain.notification.domain.TreeNotification;
import java.util.List;
import java.util.UUID;

public interface TreeNotificationRepository {

    TreeNotification save(TreeNotification treeNotification);

    List<TreeNotification> findByTreeId(UUID treeId);
}
