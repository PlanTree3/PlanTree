package com.plantree.forestservice.global.infra;

import java.time.Duration;
import java.util.Optional;

public interface RedisRepository {

    void setValue(String key, Object value, Duration duration);

    Optional<Object> getValue(String key);

}
