package com.example.notificationservice.domain.notification.controller.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    @KafkaListener(topics = "plantree-topic", groupId = "kafkaGroup")
    public String consumeForestTopic(String payload) {
        return payload;
    }
}
