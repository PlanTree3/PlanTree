package com.example.notificationservice.domain.notification.infra;

import com.example.notificationservice.domain.notification.application.repository.ForestNotificationRepository;
import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.infra.mongo.ForestNotificationMongoRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ForestNotificationRepositoryImpl implements ForestNotificationRepository {

    private final ForestNotificationMongoRepository forestNotificationMongoRepository;

    @Override
    public ForestNotification save(ForestNotification forestNotification) {
        return forestNotificationMongoRepository.save(forestNotification);
    }

    @Override
    public List<ForestNotification> findByTreeId(UUID treeId) {
        return forestNotificationMongoRepository.findByTreeId(treeId);
    }

    @Override
    public List<ForestNotification> findByIdIn(List<String> ids) {
        return forestNotificationMongoRepository.findByIdIn(ids);
    }
}
