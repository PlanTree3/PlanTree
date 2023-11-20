package com.example.notificationservice.domain.notification.domain;

import com.example.notificationservice.global.util.SequentialUUIDGenerator;
import java.time.LocalDate;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
public class TreeNotification {

    @Id
    @Column(name = "notification_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(columnDefinition = "BINARY(16)")
    private UUID treeId;

    @Column
    private LocalDate createdAt;

    @Column(columnDefinition = "VARCHAR(500)")
    private String data;

    @Builder
    public TreeNotification(UUID treeId, String createdAt, String data) {
        this.treeId = treeId;
        this.createdAt = LocalDate.parse(createdAt);
        this.data = data;
    }

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }
}
