package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import com.example.notificationservice.global.config.webmvc.AuthMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationDeleteUseCase {

    private final RedisRepository redisRepository;

    @Transactional
    public void deleteNotificationBox(AuthMember authMember) {
        redisRepository.deleteAll(authMember.getMemberId()
                                            .toString());
    }
}
