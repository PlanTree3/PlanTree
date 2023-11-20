package com.plantree.forestservice.global.exception.Seed;

import com.plantree.forestservice.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class SeedNotFoundException extends BusinessException {
    public SeedNotFoundException() {
        super(HttpStatus.NOT_FOUND.value(), "씨앗를 찾을 수 없습니다.");
    }

}
