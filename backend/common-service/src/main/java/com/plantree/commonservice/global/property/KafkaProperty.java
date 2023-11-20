package com.plantree.commonservice.global.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties("kafka")
public class KafkaProperty {
    private String bootstrapServersConfig;
    private String defaultTopic;
}
