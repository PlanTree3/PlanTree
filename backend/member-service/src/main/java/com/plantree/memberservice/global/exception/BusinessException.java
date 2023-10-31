package com.plantree.memberservice.global.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {

    private final int statusCode;

    public BusinessException(int statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }
}
