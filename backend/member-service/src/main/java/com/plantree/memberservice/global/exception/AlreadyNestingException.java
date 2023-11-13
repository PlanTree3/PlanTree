package com.plantree.memberservice.global.exception;

public class AlreadyNestingException extends BusinessException {

    public AlreadyNestingException() {
        super(400, "이미 둥지가 있습니다.");
    }
}
