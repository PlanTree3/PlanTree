package com.example.notificationservice.domain.notification.infra.jpa;

import com.example.notificationservice.domain.notification.domain.TreeNotification;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreeNotificationJpaRepository extends JpaRepository<TreeNotification, UUID> {

}
