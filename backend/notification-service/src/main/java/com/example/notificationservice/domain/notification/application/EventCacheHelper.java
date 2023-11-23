package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class EventCacheHelper {

    private final RedisRepository redisRepository;

    public void cacheStudentEvent(List<UUID> parentIds, List<UUID> teacherIds,
            ObjectId notificationId) {
        cacheAdultsNotification(parentIds, notificationId);
        cacheAdultsNotification(teacherIds, notificationId);
    }

    public void cacheParentEvent(UUID studentId, ObjectId notificationId) {
        redisRepository.setValue(makeKey(studentId, notificationId), false, Duration.ofDays(30));
    }

    public void cacheTeacherEvent(UUID studentId, List<UUID> parentIds, ObjectId notificationId) {
        cacheAdultsNotification(parentIds, notificationId);
        redisRepository.setValue(makeKey(studentId, notificationId), false, Duration.ofDays(30));
    }

    private void cacheAdultsNotification(List<UUID> adultIds, ObjectId notificationId) {
        if (adultIds != null) {
            adultIds.forEach(
                    adultId -> redisRepository.setValue(makeKey(adultId, notificationId), false,
                            Duration.ofDays(30)));
        }
    }

    private String makeKey(UUID memberId, ObjectId notificationId) {
        return memberId + ":" + notificationId;
    }

}
