package com.example.notificationservice.global.exception;

public class DeserializeFailException extends BusinessException{
    public DeserializeFailException(){
        super(500, "역직렬화 실패");
    }
}
