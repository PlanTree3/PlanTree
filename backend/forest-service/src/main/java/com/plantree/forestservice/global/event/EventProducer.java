package com.plantree.forestservice.global.event;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plantree.forestservice.global.infra.Producer;

public class EventProducer {

    private static Producer producer;

    public static void setProducer(Producer producer) {
        EventProducer.producer = producer;
    }

    public static void send(ForestEvent forestEvent) {
        if (producer != null) {
            try {
                String payload = new ObjectMapper().writeValueAsString(forestEvent);
                System.out.println(payload);
                producer.produce(payload);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
    }
}

