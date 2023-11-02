package com.plantree.forestservice.global.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedAccessException extends BusinessException {


    public UnauthorizedAccessException() {
        super(HttpStatus.UNAUTHORIZED.value(), "접근할 수 없습니다.");
    }

}
