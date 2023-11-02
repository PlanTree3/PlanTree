package com.plantree.memberservice.global.exception;

public class TokenExpiredException extends BusinessException {

    public TokenExpiredException() {
        super(401, "만료된 토큰입니다");
    }
}
