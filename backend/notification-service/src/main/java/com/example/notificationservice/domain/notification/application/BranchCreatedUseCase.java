package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.client.MemberServiceClient;
import com.example.notificationservice.domain.notification.application.repository.ForestNotificationRepository;
import com.example.notificationservice.domain.notification.domain.BranchCreatedByParentNotification;
import com.example.notificationservice.domain.notification.domain.BranchCreatedByStudentNotification;
import com.example.notificationservice.domain.notification.domain.BranchCreatedByTeacherNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotification;
import com.example.notificationservice.domain.notification.domain.ForestNotificationDetail;
import com.example.notificationservice.domain.notification.domain.ForestNotificationType;
import com.example.notificationservice.domain.notification.dto.MemberNameResponseDto;
import com.example.notificationservice.domain.notification.dto.ParentIdsResponseDto;
import com.example.notificationservice.domain.notification.dto.TeacherAndParentIdsResponseDto;
import com.example.notificationservice.global.event.forest.BranchCreatedByParentEvent;
import com.example.notificationservice.global.event.forest.BranchCreatedByStudentEvent;
import com.example.notificationservice.global.event.forest.BranchCreatedByTeacherEvent;
import com.example.notificationservice.global.event.forest.ForestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BranchCreatedUseCase {

    private final EventCacheHelper eventCacheHelper;
    private final MemberServiceClient memberServiceClient;
    private final ForestNotificationRepository forestNotificationRepository;

    public void handleBranchCreatedByStudentEvent(ForestEvent forestEvent) {
        BranchCreatedByStudentEvent detail = (BranchCreatedByStudentEvent) forestEvent.getDetail();
        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(
                detail.getStudentId());
        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(
                detail.getStudentId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBranchCreatedByStudentNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheStudentEvent(ids.getParentIds(), ids.getTeacherIds(),
                forestNotification.getId());

    }

    public void handleBranchCreatedByParentEvent(ForestEvent forestEvent) {
        BranchCreatedByParentEvent detail = (BranchCreatedByParentEvent) forestEvent.getDetail();

        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(detail.getParentId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBranchCreatedByParentNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheParentEvent(detail.getStudentId(), forestNotification.getId());

    }

    public void handleBranchCreatedByTeacherEvent(ForestEvent forestEvent) {
        BranchCreatedByTeacherEvent detail = (BranchCreatedByTeacherEvent) forestEvent.getDetail();
        ParentIdsResponseDto ids = memberServiceClient.getParentIds(
                detail.getStudentId());
        MemberNameResponseDto nameDto = memberServiceClient.getMemberName(
                detail.getTeacherId());

        ForestNotification forestNotification = forestNotificationRepository.save(
                createBranchCreatedByTeacherNotification(forestEvent, nameDto.getName()));
        eventCacheHelper.cacheTeacherEvent(detail.getStudentId(), ids.getParentIds(), forestNotification.getId());
    }

    private ForestNotification createBranchCreatedByStudentNotification(ForestEvent forestEvent, String name) {
        BranchCreatedByStudentEvent event = (BranchCreatedByStudentEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BranchCreatedByStudentNotification.builder()
                                                                            .studentId(event.getStudentId())
                                                                            .branchId(event.getBranchId())
                                                                            .branchName(event.getBranchName())
                                                                            .studentName(name)
                                                                            .build();
        return buildForestNotification(forestEvent, detail, ForestNotificationType.STU_GEN_BRA);
    }

    private ForestNotification createBranchCreatedByParentNotification(ForestEvent forestEvent, String name) {
        BranchCreatedByParentEvent event = (BranchCreatedByParentEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BranchCreatedByParentNotification.builder()
                                                                           .studentId(event.getStudentId())
                                                                           .branchId(event.getBranchId())
                                                                           .branchName(event.getBranchName())
                                                                           .parentId(event.getParentId())
                                                                           .parentName(name)
                                                                           .build();
        return buildForestNotification(forestEvent, detail, ForestNotificationType.PAR_GEN_BRA);
    }

    private ForestNotification createBranchCreatedByTeacherNotification(ForestEvent forestEvent, String name) {
        BranchCreatedByTeacherEvent event = (BranchCreatedByTeacherEvent) forestEvent.getDetail();
        ForestNotificationDetail detail = BranchCreatedByTeacherNotification.builder()
                                                                            .studentId(event.getStudentId())
                                                                            .branchId(event.getBranchId())
                                                                            .branchName(event.getBranchName())
                                                                            .teacherId(event.getTeacherId())
                                                                            .teacherName(name)
                                                                            .build();
        return buildForestNotification(forestEvent, detail, ForestNotificationType.TEA_GEN_BRA);
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
