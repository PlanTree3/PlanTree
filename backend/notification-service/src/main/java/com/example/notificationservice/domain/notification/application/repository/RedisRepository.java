package com.example.notificationservice.domain.notification.application.repository;

import java.time.Duration;
import java.util.List;
import java.util.Map;

public interface RedisRepository {

    void setValueHashes(String key, String subKey, Object value);

    void setAllValueHashes(String key, Map<String, Object> map, Duration duration);

    Map<Object, Object> getAllValueHashes(String key);

    Object getValueHashes(String key, String subKey);

    List<Map<Object, Object>> findAll(String key);

    List<Map<Object, Object>> findAllWithNotificationId(String key);

    void deleteAll(String key);

}
