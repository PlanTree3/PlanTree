package com.plantree.commonservice.global.config;

import com.plantree.commonservice.global.event.EventProducer;
import com.plantree.commonservice.global.infra.Producer;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EventConfig {

    @Qualifier("kafkaProducer")
    private Producer producer;

    public EventConfig(Producer producer) {
        this.producer = producer;
    }

    @Bean
    public InitializingBean eventProducerInitializer() {
        return () -> EventProducer.setProducer(producer);
    }
}
