package com.plantree.memberservice.global.exception;

public class AlreadyWaitingStudentException extends BusinessException {

    public AlreadyWaitingStudentException() {
        super(400, "가입 신청이 된 학생입니다.");
    }
}
