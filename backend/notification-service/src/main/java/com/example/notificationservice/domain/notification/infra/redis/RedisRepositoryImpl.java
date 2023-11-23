package com.example.notificationservice.domain.notification.infra.redis;

import com.example.notificationservice.domain.notification.application.repository.RedisRepository;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisRepositoryImpl implements RedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void setValue(String key, Object value, Duration duration) {
        redisTemplate.opsForValue()
                     .set(key, value, duration);
    }

    @Override
    public void setValue(String key, Object value) {
        redisTemplate.opsForValue()
                     .set(key, value);
    }

    @Override
    public Object getValue(String key) {
        return redisTemplate.opsForValue()
                            .get(key);
    }

    @Override
    public List<Object> getValuesByPrefix(String key) {
        Set<String> keys = redisTemplate.keys(key + ":*");
        if (keys == null) {
            return new ArrayList<>();
        }
        return redisTemplate.opsForValue()
                            .multiGet(keys);
    }

    @Override
    public Map<String, Object> findAllEntires(String key) {
        Set<String> keys = redisTemplate.keys(key + ":*");
        Map<String, Object> entries = new HashMap<>();
        if (keys == null) {
            return entries;
        }
        List<String> keyList = new ArrayList<>(keys);
        List<Object> valueList = redisTemplate.opsForValue()
                                              .multiGet(keyList);
        for (int idx = 0; idx < keyList.size(); idx++) {
            entries.put(keyList.get(idx)
                               .split(":")[1], valueList.get(idx));
        }
        return entries;
    }

    @Override
    public void deleteAll(String key) {
        redisTemplate.delete(Objects.requireNonNull(redisTemplate.keys(key + ":*")));
    }

//    @Override
//    public void setValueHashes(String key, String subKey, Object value) {
//        redisTemplate.opsForHash()
//                     .put(key, subKey, value);
//    }
//
//    @Override
//    public void setAllValueHashes(String key, Map<String, Object> map, Duration duration) {
//        key += ":" + UUID.randomUUID();
//        redisTemplate.opsForHash()
//                     .putAll(key, map);
//        redisTemplate.expire(key, duration);
//    }
//
//    @Override
//    public Map<Object, Object> getAllValueHashes(String key) {
//        return redisTemplate.opsForHash()
//                            .entries(key);
//    }
//
//    @Override
//    public Object getValueHashes(String key, String subKey) {
//        return redisTemplate.opsForHash()
//                            .get(key, subKey);
//    }
//
//    @Override
//    public List<Map<Object, Object>> findAll(String key) {
//        Set<String> keys = redisTemplate.keys(key + ":*");
//        if (keys == null) {
//            return null;
//        }
//        return keys.stream()
//                   .map(k -> redisTemplate.opsForHash()
//                                          .entries(k))
//                   .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<Map<Object, Object>> findAllWithNotificationId(String key) {
//        Set<String> keys = redisTemplate.keys(key + ":*");
//        if (keys == null) {
//            return null;
//        }
//        return keys.stream()
//                   .map(k -> {
//                       Map<Object, Object> map = redisTemplate.opsForHash()
//                                                              .entries(k);
//                       map.put("notificationId", k.split(":")[1]);
//                       return map;
//                   })
//                   .collect(Collectors.toList());
//    }
//
//    public void deleteAll(String key) {
//        Set<String> keys = redisTemplate.keys(key + ":*");
//        if (keys != null) {
//            redisTemplate.delete(keys);
//        }
//    }
}
