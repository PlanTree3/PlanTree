package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.repository.ForestNotificationRepository;
import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.dto.CheckNotificationPresentResponseDto;
import com.example.notificationservice.domain.notification.dto.NotificationBoxResponseDto;
import com.example.notificationservice.domain.notification.dto.NotificationResponseDto;
import com.example.notificationservice.domain.notification.dto.TreeLogResponseDto;
import com.example.notificationservice.domain.notification.dto.TreeLogsResponseDto;
import com.example.notificationservice.global.config.webmvc.AuthMember;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationSearchUseCase {

    private final RedisRepository redisRepository;
    private final ForestNotificationRepository forestNotificationRepository;
    
    public CheckNotificationPresentResponseDto checkNotificationPresent(AuthMember authMember) {
        List<Object> notificationList = redisRepository.getValuesByPrefix(authMember.getMemberId()
                                                                                    .toString());
        return new CheckNotificationPresentResponseDto(notificationList.stream()
                                                                       .anyMatch(v -> v.equals(false)));
    }

    @Transactional(readOnly = true)
    public NotificationBoxResponseDto searchNotificationBox(AuthMember authMember) {
        Map<String, Object> isNotificationReadList = redisRepository.findAllEntires(authMember.getMemberId()
                                                                                              .toString());
        List<ForestNotification> forestNotificationList = forestNotificationRepository.findByIdIn(
                new ArrayList<>(isNotificationReadList.keySet()));
        List<NotificationResponseDto> notifications = new ArrayList<>();
        for (ForestNotification forestNotification : forestNotificationList) {
            notifications.add(new NotificationResponseDto(forestNotification, (boolean) isNotificationReadList.get(
                    forestNotification.getId()
                                      .toString())));
        }
        return new NotificationBoxResponseDto(notifications);
    }

    @Transactional(readOnly = true)
    public TreeLogsResponseDto searchTreeNotification(UUID treeId, AuthMember authMember) {
        List<ForestNotification> notifications = forestNotificationRepository.findByTreeId(treeId);
        List<TreeLogResponseDto> logs = notifications.stream()
                                                     .map(TreeLogResponseDto::new)
                                                     .collect(Collectors.toList());
        return new TreeLogsResponseDto(logs);
    }
}
