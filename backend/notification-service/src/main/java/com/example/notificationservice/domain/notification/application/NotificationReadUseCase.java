package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import com.example.notificationservice.global.config.webmvc.AuthMember;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationReadUseCase {

    private final RedisRepository repository;

    public void readNotification(UUID notificationId, AuthMember authMember) {
        repository.setValueHashes(authMember.getMemberId() + ":" + notificationId, "isRead", true);
    }
}
