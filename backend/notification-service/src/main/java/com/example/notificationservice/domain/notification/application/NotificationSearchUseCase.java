package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import com.example.notificationservice.domain.notification.application.repository.TreeNotificationRepository;
import com.example.notificationservice.domain.notification.domain.TreeNotification;
import com.example.notificationservice.domain.notification.dto.CheckNotificationPresentResponseDto;
import com.example.notificationservice.domain.notification.dto.NotificationBoxResponseDto;
import com.example.notificationservice.domain.notification.dto.NotificationResponseDto;
import com.example.notificationservice.domain.notification.dto.TreeLogResponseDto;
import com.example.notificationservice.domain.notification.dto.TreeLogsResponseDto;
import com.example.notificationservice.global.config.webmvc.AuthMember;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationSearchUseCase {

    private final RedisRepository redisRepository;
    private final TreeNotificationRepository treeNotificationRepository;

    @Transactional(readOnly = true)
    public CheckNotificationPresentResponseDto checkNotificationPresent(AuthMember authMember) {
        List<Map<Object, Object>> notificationList = redisRepository.findAll(
                authMember.getMemberId()
                          .toString());
        return new CheckNotificationPresentResponseDto(notificationList);
    }

    @Transactional(readOnly = true)
    public NotificationBoxResponseDto searchNotificationBox(AuthMember authMember) {
        List<Map<Object, Object>> notificationList = redisRepository.findAllWithNotificationId(
                authMember.getMemberId()
                          .toString());
        List<NotificationResponseDto> notifications = new ArrayList<>();
        for (Map<Object, Object> map : notificationList) {
            NotificationResponseDto notification;
            try {
                notification = new ObjectMapper().readValue(
                        (String) map.get("payload"), NotificationResponseDto.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            notification.setRead((Boolean) map.get("isRead"));
            notification.setNotificationId(UUID.fromString(map.get("notificationId")
                                                              .toString()));
            notifications.add(notification);
        }
        return new NotificationBoxResponseDto(notifications);
    }

    @Transactional(readOnly = true)
    public TreeLogsResponseDto searchTreeNotification(UUID treeId, AuthMember authMember) {
        List<TreeNotification> notifications = treeNotificationRepository.findByTreeId(treeId);
        List<TreeLogResponseDto> logs = new ArrayList<>();
        for (TreeNotification treeNotification : notifications) {
            TreeLogResponseDto log;
            try {
                log = new ObjectMapper().readValue(treeNotification.getData(),
                        TreeLogResponseDto.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            logs.add(log);
        }
        return new TreeLogsResponseDto(logs);
    }
}
