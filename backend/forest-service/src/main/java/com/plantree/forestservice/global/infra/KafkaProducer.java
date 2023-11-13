package com.plantree.forestservice.global.infra;

import com.plantree.forestservice.global.event.Event;
import com.plantree.forestservice.global.event.EventProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;

@Component
@RequiredArgsConstructor
public class KafkaProducer implements Producer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void produce(String payload) {
        kafkaTemplate.sendDefault(payload);
    }
}
