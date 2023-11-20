package com.example.notificationservice.domain.notification.application;

import com.example.notificationservice.domain.notification.application.client.MemberServiceClient;
import com.example.notificationservice.domain.notification.application.repository.TreeNotificationRepository;
import com.example.notificationservice.domain.notification.domain.TreeNotification;
import com.example.notificationservice.domain.notification.dto.MemberNameResponseDto;
import com.example.notificationservice.domain.notification.dto.ParentIdsResponseDto;
import com.example.notificationservice.domain.notification.dto.TeacherAndParentIdsResponseDto;
import com.example.notificationservice.global.event.forest.BranchCreatedByParentEvent;
import com.example.notificationservice.global.event.forest.BranchCreatedByStudentEvent;
import com.example.notificationservice.global.event.forest.BranchCreatedByTeacherEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByParentEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByStudentEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByTeacherEvent;
import com.example.notificationservice.global.event.forest.BudCompletedEvent;
import com.example.notificationservice.global.event.forest.BudCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EventHandler {

    private final TreeNotificationRepository treeNotificationRepository;
    private final MemberServiceClient memberServiceClient;
    private final EventNotificationHelper eventNotificationHelper;

    @Transactional
    public void handleBudCreatedEvent(BudCreatedEvent budCreatedEvent, String payload) {
        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(
                budCreatedEvent.getStudentId());
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                budCreatedEvent.getStudentId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(budCreatedEvent.getTreeId())
                                                        .createdAt(budCreatedEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveStudentEvent(ids.getParentIds(), ids.getTeacherIds(), payload);
    }

    @Transactional
    public void handleBudCompletedEvent(BudCompletedEvent budCompletedEvent, String payload) {
        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(
                budCompletedEvent.getStudentId());
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                budCompletedEvent.getStudentId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(budCompletedEvent.getTreeId())
                                                        .createdAt(budCompletedEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveStudentEvent(ids.getParentIds(), ids.getTeacherIds(), payload);
    }

    @Transactional
    public void handleBranchCreatedByParentEvent(
            BranchCreatedByParentEvent branchCreatedByParentEvent, String payload) {
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                branchCreatedByParentEvent.getParentId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(branchCreatedByParentEvent.getTreeId())
                                                        .createdAt(
                                                                branchCreatedByParentEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveParentEvent(branchCreatedByParentEvent.getStudentId(), payload);
    }

    @Transactional
    public void handleBranchCreatedByTeacherEvent(
            BranchCreatedByTeacherEvent branchCreatedByTeacherEvent, String payload) {
        ParentIdsResponseDto parentIdsResponseDto = memberServiceClient.getParentIds(
                branchCreatedByTeacherEvent.getStudentId());
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                branchCreatedByTeacherEvent.getTeacherId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(branchCreatedByTeacherEvent.getTreeId())
                                                        .createdAt(
                                                                branchCreatedByTeacherEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveTeacherEvent(branchCreatedByTeacherEvent.getStudentId(),
                parentIdsResponseDto.getParentIds(), payload);
    }

    @Transactional
    public void handleBranchCreatedByStudentEvent(
            BranchCreatedByStudentEvent branchCreatedByStudentEvent, String payload) {
        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(
                branchCreatedByStudentEvent.getStudentId());
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                branchCreatedByStudentEvent.getStudentId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(branchCreatedByStudentEvent.getTreeId())
                                                        .createdAt(
                                                                branchCreatedByStudentEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveStudentEvent(ids.getParentIds(), ids.getTeacherIds(), payload);
    }

    @Transactional
    public void handleBudCommentCreatedByParentEvent(
            BudCommentCreatedByParentEvent budCommentCreatedByParentEvent, String payload) {
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                budCommentCreatedByParentEvent.getParentId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(budCommentCreatedByParentEvent.getTreeId())
                                                        .createdAt(
                                                                budCommentCreatedByParentEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveParentEvent(budCommentCreatedByParentEvent.getStudentId(),
                payload);
    }

    @Transactional
    public void handleBudCommentCreatedByTeacherEvent(
            BudCommentCreatedByTeacherEvent budCommentCreatedByTeacherEvent, String payload) {
        ParentIdsResponseDto parentIdsResponseDto = memberServiceClient.getParentIds(
                budCommentCreatedByTeacherEvent.getStudentId());
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                budCommentCreatedByTeacherEvent.getTeacherId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(budCommentCreatedByTeacherEvent.getTreeId())
                                                        .createdAt(
                                                                budCommentCreatedByTeacherEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveTeacherEvent(budCommentCreatedByTeacherEvent.getStudentId(),
                parentIdsResponseDto.getParentIds(), payload);
    }

    @Transactional
    public void handleBudCommentCreatedByStudentEvent(
            BudCommentCreatedByStudentEvent budCommentCreatedByStudentEvent, String payload) {
        TeacherAndParentIdsResponseDto ids = memberServiceClient.getTeacherAndParentIds(
                budCommentCreatedByStudentEvent.getStudentId());
        MemberNameResponseDto name = memberServiceClient.getMemberName(
                budCommentCreatedByStudentEvent.getStudentId());
        payload = payload.replace("}", ",\"memberName\":\"" + name.getName() + "\"}");
        treeNotificationRepository.save(TreeNotification.builder()
                                                        .treeId(budCommentCreatedByStudentEvent.getTreeId())
                                                        .createdAt(
                                                                budCommentCreatedByStudentEvent.getCreatedAt())
                                                        .data(payload)
                                                        .build());
        eventNotificationHelper.saveStudentEvent(ids.getParentIds(), ids.getTeacherIds(), payload);
    }
}
