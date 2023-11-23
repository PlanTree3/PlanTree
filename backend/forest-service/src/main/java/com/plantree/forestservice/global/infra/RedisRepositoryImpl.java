package com.plantree.forestservice.global.infra;

import java.time.Duration;
import java.util.Optional;
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
    public Optional<Object> getValue(String key) {
        return Optional.ofNullable(redisTemplate.opsForValue()
                                                .get(key));
    }
}
