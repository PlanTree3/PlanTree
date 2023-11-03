package com.plantree.memberservice.global.exception;

public class AuthenticationFailException extends BusinessException {

    public AuthenticationFailException(String message) {
        super(400, message);
    }
}
