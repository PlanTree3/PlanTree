package com.plantree.memberservice.domain.auth.dto;

import lombok.Getter;

@Getter
public class SignUpResponseDto {

    private String memberId;

    public SignUpResponseDto(String memberId) {
        this.memberId = memberId;
    }
}
