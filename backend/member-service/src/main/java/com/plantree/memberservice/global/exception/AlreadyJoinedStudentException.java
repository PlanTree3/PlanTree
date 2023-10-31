package com.plantree.memberservice.global.exception;

public class AlreadyJoinedStudentException extends BusinessException {

    public AlreadyJoinedStudentException() {
        super(400, "이미 가입한 학생입니다.");
    }
}
