package com.plantree.apigatewayservice.exception;

public class TokenExpiredException extends BusinessException {

    public TokenExpiredException() {
        super(401, "토큰 만료");
    }
}
