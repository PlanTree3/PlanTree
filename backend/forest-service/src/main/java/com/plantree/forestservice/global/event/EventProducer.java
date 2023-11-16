package com.plantree.forestservice.global.event;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plantree.forestservice.global.infra.Producer;

public class EventProducer {

    private static Producer producer;

    public static void setProducer(Producer producer) {
        EventProducer.producer = producer;
    }

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

