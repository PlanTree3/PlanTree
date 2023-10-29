package com.plantree.memberservice.domain.auth.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class SignUpResponseDto {

    private UUID memberId;

    public SignUpResponseDto(UUID memberId) {
        this.memberId = memberId;
    }

}
