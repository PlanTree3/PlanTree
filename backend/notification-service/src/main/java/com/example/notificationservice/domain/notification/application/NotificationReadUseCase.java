package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import com.example.notificationservice.global.config.webmvc.AuthMember;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationReadUseCase {

    private final RedisRepository repository;

    public void readNotification(ObjectId notificationId, AuthMember authMember) {
        repository.setValue(authMember.getMemberId() + ":" + notificationId, true);
    }
}
