package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.client.MemberServiceClient;
import com.example.notificationservice.domain.notification.application.repository.ForestNotificationRepository;
import com.example.notificationservice.domain.notification.domain.BudCompletedNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotificationDetail;
import com.example.notificationservice.domain.notification.domain.ForestNotificationType;
import com.example.notificationservice.domain.notification.dto.MemberNameResponseDto;
import com.example.notificationservice.domain.notification.dto.TeacherAndParentIdsResponseDto;
import com.example.notificationservice.global.event.forest.BudCompletedEvent;
import com.example.notificationservice.global.event.forest.ForestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BudCompletedUseCase {

    private final EventCacheHelper eventCacheHelper;
    private final MemberServiceClient memberServiceClient;
    private final ForestNotificationRepository forestNotificationRepository;

    public void handleBudCompletedEvent(ForestEvent forestEvent) {
        BudCompletedEvent detail = (BudCompletedEvent) forestEvent.getDetail();

        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(detail.getStudentId());
        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(detail.getStudentId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBudCompletedNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheStudentEvent(ids.getParentIds(), ids.getTeacherIds(), forestNotification.getId());

    }

    public ForestNotification createBudCompletedNotification(ForestEvent forestEvent, String name) {
        BudCompletedEvent event = (BudCompletedEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BudCompletedNotification.builder()
                                                                  .studentId(event.getStudentId())
                                                                  .budId(event.getBudId())
                                                                  .budName(event.getBudName())
                                                                  .studentName(name)
                                                                  .build();
        return ForestNotification.builder()
                                 .treeId(forestEvent.getTreeId())
                                 .createdAt(forestEvent.getCreatedAt())
                                 .type(ForestNotificationType.STU_COM_BUD)
                                 .detail(detail)
                                 .build();
    }
}
