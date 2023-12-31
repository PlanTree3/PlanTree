package com.example.notificationservice.domain.notification.infra;

import com.example.notificationservice.domain.notification.application.repository.TreeNotificationRepository;
import com.example.notificationservice.domain.notification.domain.TreeNotification;
import com.example.notificationservice.domain.notification.infra.jpa.TreeNotificationJpaRepository;
import com.example.notificationservice.domain.notification.infra.query.TreeNotificationQueryRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TreeNotificationRepositoryImpl implements TreeNotificationRepository {

    private final TreeNotificationJpaRepository treeNotificationJpaRepository;
    private final TreeNotificationQueryRepository treeNotificationQueryRepository;


    @Override
    public TreeNotification save(TreeNotification treeNotification) {
        return treeNotificationJpaRepository.save(treeNotification);
    }

    @Override
    public List<TreeNotification> findByTreeId(UUID treeId) {
        return treeNotificationJpaRepository.findByTreeId(treeId);
    }
}
