package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventNotificationHelper {

    private final RedisRepository redisRepository;

    public void saveStudentEvent(List<UUID> parentIds, List<UUID> teacherIds, String payload) {
        Map<String, Object> notificationInfo = getNotificationInfo(payload);
        parentIds.forEach(
                parentId -> redisRepository.setAllValueHashes(parentId.toString(), notificationInfo,
                        Duration.ofDays(30)));
        teacherIds.forEach(teacherId -> redisRepository.setAllValueHashes(teacherId.toString(),
                notificationInfo, Duration.ofDays(30)));
    }

    public void saveParentEvent(UUID studentId, String payload) {
        Map<String, Object> notificationInfo = getNotificationInfo(payload);
        redisRepository.setAllValueHashes(studentId.toString(), notificationInfo,
                Duration.ofDays(30));
    }

    public void saveTeacherEvent(UUID studentId, List<UUID> parentIds, String payload) {
        Map<String, Object> notificationInfo = getNotificationInfo(payload);
        redisRepository.setAllValueHashes(studentId.toString(), notificationInfo,
                Duration.ofDays(30));
    }

    private Map<String, Object> getNotificationInfo(String payload) {
        Map<String, Object> notificationInfo = new HashMap<>();
        notificationInfo.put("isRead", false);
        notificationInfo.put("payload", payload);
        return notificationInfo;
    }

}
