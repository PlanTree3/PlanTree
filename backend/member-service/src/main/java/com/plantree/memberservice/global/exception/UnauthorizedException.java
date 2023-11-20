package com.plantree.memberservice.global.exception;

public class UnauthorizedException extends BusinessException {

    public UnauthorizedException(String message) {
        super(403, message);
    }
}
