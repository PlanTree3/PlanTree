package com.example.notificationservice.global.config;

import static org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair.fromSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@RequiredArgsConstructor
public class CacheConfig {

    private final RedisConnectionFactory redisConnectionFactory;

    @Bean
    public RedisCacheManager redisCacheManager() {
        return RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(
                                        redisConnectionFactory)
                                                         .cacheDefaults(defaultConfiguration())
                                                         .withInitialCacheConfigurations(
                                                                 customConfiguration())
                                                         .build();
    }

    private RedisCacheConfiguration defaultConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
                                      .serializeKeysWith(fromSerializer(
                                              new StringRedisSerializer()))
                                      .serializeValuesWith(fromSerializer(
                                              new StringRedisSerializer()))
                                      .entryTtl(Duration.ofMinutes(1));
    }

    private Map<String, RedisCacheConfiguration> customConfiguration() {
        Map<String, RedisCacheConfiguration> customConfigurationMap = new HashMap<>();
        customConfigurationMap.put("캐쉬이름1",
                defaultConfiguration().entryTtl(Duration.ofSeconds(5L)));
        customConfigurationMap.put("캐쉬이름2",
                defaultConfiguration().entryTtl(Duration.ofDays(1L)));
        return customConfigurationMap;
    }
}
