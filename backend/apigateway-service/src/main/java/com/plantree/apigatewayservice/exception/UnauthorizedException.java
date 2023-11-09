package com.plantree.apigatewayservice.exception;

public class UnauthorizedException extends BusinessException {

    public UnauthorizedException() {
        super(403, "권한이 없습니다.");
    }
}
