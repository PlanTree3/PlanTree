package com.example.notificationservice.domain.notification.domain;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class TreeNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @Column(columnDefinition = "BINARY(16)")
    private UUID receiverId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID treeId;

    @Enumerated(EnumType.STRING)
    @Column
    private TreeNotificationType type;

    @Column
    private String data;
}
