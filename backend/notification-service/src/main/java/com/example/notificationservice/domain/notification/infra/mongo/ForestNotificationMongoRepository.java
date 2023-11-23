package com.example.notificationservice.domain.notification.infra.mongo;

import com.example.notificationservice.domain.notification.domain.ForestNotification;
import java.util.List;
import java.util.UUID;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ForestNotificationMongoRepository extends
        MongoRepository<ForestNotification, ObjectId> {

    List<ForestNotification> findByIdIn(List<String> id);

    List<ForestNotification> findByTreeId(UUID treeId);
}
