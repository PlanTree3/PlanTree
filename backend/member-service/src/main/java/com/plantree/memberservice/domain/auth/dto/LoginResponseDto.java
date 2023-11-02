package com.plantree.memberservice.domain.auth.dto;

import lombok.Getter;

@Getter
public class LoginResponseDto {

    private boolean isNewMember;

    public LoginResponseDto(boolean isNewMember) {
        this.isNewMember = isNewMember;
    }
}