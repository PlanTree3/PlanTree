package com.plantree.apigatewayservice.exception;

public class AuthenticationFailException extends BusinessException {

    public AuthenticationFailException(String message) {
        super(400, message);
    }
}
