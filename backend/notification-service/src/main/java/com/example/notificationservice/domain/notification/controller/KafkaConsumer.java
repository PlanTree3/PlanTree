package com.example.notificationservice.domain.notification.controller;

import com.example.notificationservice.domain.notification.application.EventHandler;
import com.example.notificationservice.global.event.forest.BranchCreatedByParentEvent;
import com.example.notificationservice.global.event.forest.BranchCreatedByStudentEvent;
import com.example.notificationservice.global.event.forest.BranchCreatedByTeacherEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByParentEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByStudentEvent;
import com.example.notificationservice.global.event.forest.BudCommentCreatedByTeacherEvent;
import com.example.notificationservice.global.event.forest.BudCompletedEvent;
import com.example.notificationservice.global.event.forest.BudCreatedEvent;
import com.example.notificationservice.global.event.forest.ForestEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private final EventHandler eventHandler;

    @KafkaListener(topics = "plantree-topic", groupId = "kafkaGroup")
    public void consumeForestTopic(String payload) {
        ForestEvent event;

        try {
            event = new ObjectMapper().readValue(payload, ForestEvent.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        if (event instanceof BudCreatedEvent) {
            eventHandler.handleBudCreatedEvent((BudCreatedEvent) event, payload);
        } else if (event instanceof BudCompletedEvent) {
            eventHandler.handleBudCompletedEvent((BudCompletedEvent) event, payload);
        } else if (event instanceof BranchCreatedByParentEvent) {
            eventHandler.handleBranchCreatedByParentEvent((BranchCreatedByParentEvent) event,
                    payload);
        } else if (event instanceof BranchCreatedByTeacherEvent) {
            eventHandler.handleBranchCreatedByTeacherEvent((BranchCreatedByTeacherEvent) event,
                    payload);
        } else if (event instanceof BranchCreatedByStudentEvent) {
            eventHandler.handleBranchCreatedByStudentEvent((BranchCreatedByStudentEvent) event,
                    payload);
        } else if (event instanceof BudCommentCreatedByParentEvent) {
            eventHandler.handleBudCommentCreatedByParentEvent(
                    (BudCommentCreatedByParentEvent) event, payload);
        } else if (event instanceof BudCommentCreatedByTeacherEvent) {
            eventHandler.handleBudCommentCreatedByTeacherEvent(
                    (BudCommentCreatedByTeacherEvent) event, payload);
        } else if (event instanceof BudCommentCreatedByStudentEvent) {
            eventHandler.handleBudCommentCreatedByStudentEvent(
                    (BudCommentCreatedByStudentEvent) event, payload);
        }

    }
}
