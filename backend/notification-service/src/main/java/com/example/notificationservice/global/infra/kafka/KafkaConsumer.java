package com.example.notificationservice.global.infra.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "test", groupId = "consumerGroupId")
    public void consume(String message) {
        System.out.println("kafka consumes message");
        System.out.println("kafka consumes message");
        System.out.println("kafka consumes message");
        System.out.println("kafka consumes message");
        System.out.println("kafka consumes message");
        System.out.println(message);
    }
}
