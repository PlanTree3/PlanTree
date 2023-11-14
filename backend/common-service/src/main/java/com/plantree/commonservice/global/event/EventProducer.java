package com.plantree.commonservice.global.event;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plantree.commonservice.global.infra.Producer;
import org.springframework.transaction.event.TransactionalEventListener;

public class EventProducer {

    private static Producer producer;

    public static void setProducer(Producer producer) {
        EventProducer.producer = producer;
    }

    @TransactionalEventListener
    public static void send(Event event) {
        if (producer != null) {
            try {
                producer.produce(new ObjectMapper().writeValueAsString(event));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
    }
}

