package com.plantree.memberservice.global.exception;

public class UnsupportedRoleException extends BusinessException {

    public UnsupportedRoleException() {
        super(400, "지원하지 않는 권한입니다.");
    }
}
