package com.example.notificationservice.domain.notification.application.repository;

import java.time.Duration;
import java.util.List;
import java.util.Map;

public interface RedisRepository {

    void setValue(String key, Object value, Duration duration);

    void setValue(String key, Object value);

    List<Object> getValuesByPrefix(String prefix);

    Map<String, Object> findAllEntires(String key);

    void deleteAll(String key);

}
