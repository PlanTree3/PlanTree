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

}
