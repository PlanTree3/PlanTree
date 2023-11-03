package com.plantree.memberservice.global.exception;

public class ParentAlreadyNestingException extends BusinessException {

    public ParentAlreadyNestingException() {
        super(400, "이미 둥지가 있습니다.");
    }
}
