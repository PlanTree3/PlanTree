package com.plantree.memberservice.global.exception;

public class PublicKeyRetrievalException extends BusinessException {

    public PublicKeyRetrievalException() {
        super(500, "공개키 목록을 가져오는데 실패했습니다.");
    }
}
