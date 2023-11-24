package com.example.notificationservice.domain.notification.domain;

import java.time.LocalDate;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notification")
@Getter
@NoArgsConstructor
public class ForestNotification {

    @Id
    private ObjectId id;
    private UUID treeId;
    private LocalDate createdAt;
    private ForestNotificationType type;

    private ForestNotificationDetail detail;


    @Builder
    public ForestNotification(UUID treeId, String createdAt, ForestNotificationType type,
            ForestNotificationDetail detail) {
        this.treeId = treeId;
        this.createdAt = LocalDate.parse(createdAt);
        this.type = type;
        this.detail = detail;
    }
}
