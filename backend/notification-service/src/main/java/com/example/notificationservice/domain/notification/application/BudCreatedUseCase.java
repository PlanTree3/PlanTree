package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.client.MemberServiceClient;
import com.example.notificationservice.domain.notification.application.repository.ForestNotificationRepository;
import com.example.notificationservice.domain.notification.domain.BudCreatedNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotificationDetail;
import com.example.notificationservice.domain.notification.domain.ForestNotificationType;
import com.example.notificationservice.domain.notification.dto.MemberNameResponseDto;
import com.example.notificationservice.domain.notification.dto.TeacherAndParentIdsResponseDto;
import com.example.notificationservice.global.event.forest.BudCreatedEvent;
import com.example.notificationservice.global.event.forest.ForestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BudCreatedUseCase {

    private final EventCacheHelper eventCacheHelper;
    private final MemberServiceClient memberServiceClient;
    private final ForestNotificationRepository forestNotificationRepository;

    public void handleBudCreatedEvent(ForestEvent forestEvent) {
        BudCreatedEvent detail = (BudCreatedEvent) forestEvent.getDetail();
        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(detail.getStudentId());
        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(detail.getStudentId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBudCreatedNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheStudentEvent(ids.getParentIds(), ids.getTeacherIds(), forestNotification.getId());
    }

    public ForestNotification createBudCreatedNotification(ForestEvent forestEvent, String name) {
        BudCreatedEvent event = (BudCreatedEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BudCreatedNotification.builder()
                                                                .studentId(event.getStudentId())
                                                                .budId(event.getBudId())
                                                                .budName(event.getBudName())
                                                                .studentName(name)
                                                                .build();
        return ForestNotification.builder()
                                 .treeId(forestEvent.getTreeId())
                                 .createdAt(forestEvent.getCreatedAt())
                                 .type(ForestNotificationType.STU_GEN_BUD)
                                 .detail(detail)
                                 .build();
    }
}
