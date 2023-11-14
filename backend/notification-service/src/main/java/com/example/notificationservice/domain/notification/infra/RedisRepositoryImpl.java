package com.example.notificationservice.domain.notification.infra;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisRepositoryImpl implements RedisRepository {

    private final RedisTemplate<String, Map<String, Object>> redisTemplate;

    @Override
    public void setValueHashes(String key, String subKey, Object value) {
        redisTemplate.opsForHash()
                     .put(key, subKey, value);
    }

    @Override
    public void setAllValueHashes(String key, Map<String, Object> map, Duration duration) {
        key += ":" + UUID.randomUUID();
        redisTemplate.opsForHash()
                     .putAll(key, map);
        redisTemplate.expire(key, duration);
    }

    @Override
    public Map<Object, Object> getAllValueHashes(String key) {
        return redisTemplate.opsForHash()
                            .entries(key);
    }

    @Override
    public Object getValueHashes(String key, String subKey) {
        return redisTemplate.opsForHash()
                            .get(key, subKey);
    }

    @Override
    public List<Map<Object, Object>> findAll(String key) {
        Set<String> keys = redisTemplate.keys(key + ":*");
        if (keys == null) {
            return null;
        }
        return keys.stream()
                   .map(k -> redisTemplate.opsForHash()
                                          .entries(k))
                   .collect(Collectors.toList());
    }

    @Override
    public List<Map<Object, Object>> findAllWithNotificationId(String key) {
        Set<String> keys = redisTemplate.keys(key + ":*");
        if (keys == null) {
            return null;
        }
        return keys.stream()
                   .map(k -> {
                       Map<Object, Object> map = redisTemplate.opsForHash()
                                                              .entries(k);
                       map.put("notificationId", k.split(":")[1]);
                       return map;
                   })
                   .collect(Collectors.toList());
    }

    public void deleteAll(String key) {
        Set<String> keys = redisTemplate.keys(key + ":*");
        if (keys != null) {
            redisTemplate.delete(keys);
        }
    }
}
