package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.client.MemberServiceClient;
import com.example.notificationservice.domain.notification.application.repository.ForestNotificationRepository;
import com.example.notificationservice.domain.notification.domain.BudCommentCreatedByParentNotification;
import com.example.notificationservice.domain.notification.domain.BudCommentCreatedByStudentNotification;
import com.example.notificationservice.domain.notification.domain.BudCommentCreatedByTeacherNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotificationDetail;
import com.example.notificationservice.domain.notification.domain.ForestNotificationType;
import com.example.notificationservice.domain.notification.dto.MemberNameResponseDto;
import com.example.notificationservice.domain.notification.dto.ParentIdsResponseDto;
import com.example.notificationservice.domain.notification.dto.TeacherAndParentIdsResponseDto;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByParentEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByStudentEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByTeacherEvent;
import com.example.notificationservice.global.event.forest.ForestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BudCommentWritedUseCase {

    private final EventCacheHelper eventCacheHelper;
    private final MemberServiceClient memberServiceClient;
    private final ForestNotificationRepository forestNotificationRepository;

    public void handleBudCommentCreatedByStudentEvent(ForestEvent forestEvent) {
        BudCommentCreatedByStudentEvent detail = (BudCommentCreatedByStudentEvent) forestEvent.getDetail();
        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(
                detail.getStudentId());
        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(
                detail.getStudentId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBudCommentCreatedByStudentNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheStudentEvent(ids.getParentIds(), ids.getTeacherIds(),
                forestNotification.getId());
    }

    public void handleBudCommentCreatedByParentEvent(ForestEvent forestEvent) {
        BudCommentCreatedByParentEvent detail = (BudCommentCreatedByParentEvent) forestEvent.getDetail();

        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(
                detail.getStudentId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBudCommentCreatedByParentNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheParentEvent(detail.getStudentId(), forestNotification.getId());

    }

    public void handleBudCommentCreatedByTeacherEvent(ForestEvent forestEvent) {
        BudCommentCreatedByTeacherEvent detail = (BudCommentCreatedByTeacherEvent) forestEvent.getDetail();
        ParentIdsResponseDto ids = memberServiceClient.getParentIds(detail.getStudentId());
        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(detail.getTeacherId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBudCommentCreatedByTeacherNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheTeacherEvent(detail.getStudentId(), ids.getParentIds(), forestNotification.getId());
    }

    private ForestNotification createBudCommentCreatedByStudentNotification(ForestEvent forestEvent, String name) {
        BudCommentCreatedByStudentEvent event = (BudCommentCreatedByStudentEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BudCommentCreatedByStudentNotification.builder()
                                                                                .studentId(event.getStudentId())
                                                                                .budId(event.getBudId())
                                                                                .budName(event.getBudName())
                                                                                .studentName(name)
                                                                                .build();
        return buildForestNotification(forestEvent, detail, ForestNotificationType.STU_WRI_BUD);
    }

    private ForestNotification createBudCommentCreatedByParentNotification(ForestEvent forestEvent, String name) {
        BudCommentCreatedByParentEvent event = (BudCommentCreatedByParentEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BudCommentCreatedByParentNotification.builder()
                                                                               .studentId(event.getStudentId())
                                                                               .budId(event.getBudId())
                                                                               .budName(event.getBudName())
                                                                               .parentName(name)
                                                                               .build();
        return buildForestNotification(forestEvent, detail, ForestNotificationType.PAR_WRI_BUD);
    }

    private ForestNotification createBudCommentCreatedByTeacherNotification(ForestEvent forestEvent, String name) {
        BudCommentCreatedByTeacherEvent event = (BudCommentCreatedByTeacherEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BudCommentCreatedByTeacherNotification.builder()
                                                                                .studentId(event.getStudentId())
                                                                                .budId(event.getBudId())
                                                                                .budName(event.getBudName())
                                                                                .teacherName(name)
                                                                                .build();
        return buildForestNotification(forestEvent, detail, ForestNotificationType.TEA_WRI_BUD);
    }


    private ForestNotification buildForestNotification(ForestEvent forestEvent, ForestNotificationDetail detail,
            ForestNotificationType type) {
        return ForestNotification.builder()
                                 .treeId(forestEvent.getTreeId())
                                 .createdAt(forestEvent.getCreatedAt())
                                 .type(type)
                                 .detail(detail)
                                 .build();
    }
}
