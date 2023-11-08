package com.example.notificationservice.domain.notification.infra;

import com.example.notificationservice.domain.notification.application.repository.TreeNotificationRepository;
import com.example.notificationservice.domain.notification.infra.jpa.TreeNotificationJpaRepository;
import com.example.notificationservice.domain.notification.infra.query.TreeNotificationQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TreeNotificationRepositoryImpl implements TreeNotificationRepository {

    private final TreeNotificationJpaRepository treeNotificationJpaRepository;
    private final TreeNotificationQueryRepository treeNotificationQueryRepository;
}
