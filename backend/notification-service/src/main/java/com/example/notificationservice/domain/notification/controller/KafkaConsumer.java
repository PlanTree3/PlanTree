package com.example.notificationservice.domain.notification.controller;

import com.example.notificationservice.domain.notification.application.BranchCreatedUseCase;
import com.example.notificationservice.domain.notification.application.BudCommentWritedUseCase;
import com.example.notificationservice.domain.notification.application.BudCompletedUseCase;
import com.example.notificationservice.domain.notification.application.BudCreatedUseCase;
import com.example.notificationservice.global.event.forest.ForestEvent;
import com.example.notificationservice.global.exception.DeserializeFailException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private final BudCreatedUseCase budCreatedUseCase;
    private final BudCompletedUseCase budCompletedUseCase;
    private final BranchCreatedUseCase branchCreatedUseCase;
    private final BudCommentWritedUseCase budCommentWritedUseCase;

    @KafkaListener(topics = "plantree-topic", groupId = "kafkaGroup")
    public void consumeForestTopic(String payload) {
        ForestEvent event;

        try {
            event = new ObjectMapper().readValue(payload, ForestEvent.class);
        } catch (JsonProcessingException e) {
            throw new DeserializeFailException();
        }

        switch (event.getType()) {
            case STU_GEN_BUD:
                budCreatedUseCase.handleBudCreatedEvent(event);
                break;
            case STU_COM_BUD:
                budCompletedUseCase.handleBudCompletedEvent(event);
                break;
            case STU_GEN_BRA:
                branchCreatedUseCase.handleBranchCreatedByStudentEvent(event);
                break;
            case PAR_GEN_BRA:
                branchCreatedUseCase.handleBranchCreatedByParentEvent(event);
                break;
            case TEA_GEN_BRA:
                branchCreatedUseCase.handleBranchCreatedByTeacherEvent(event);
                break;
            case STU_WRI_BUD:
                budCommentWritedUseCase.handleBudCommentCreatedByStudentEvent(event);
                break;
            case PAR_WRI_BUD:
                budCommentWritedUseCase.handleBudCommentCreatedByParentEvent(event);
                break;
            case TEA_WRI_BUD:
                budCommentWritedUseCase.handleBudCommentCreatedByTeacherEvent(event);
                break;
            default:
                break;
        }
    }
}
