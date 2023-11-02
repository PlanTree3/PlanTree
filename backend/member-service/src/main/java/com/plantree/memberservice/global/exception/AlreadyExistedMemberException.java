package com.plantree.memberservice.global.exception;

public class AlreadyExistedMemberException extends BusinessException {

    public AlreadyExistedMemberException(String message) {
        super(400, message);
    }
}
