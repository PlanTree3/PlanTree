package com.plantree.memberservice.domain.member.dto;

import lombok.Getter;

@Getter
public class MemberNameResponseDto {

    String name;

    public MemberNameResponseDto(String name) {
        this.name = name;
    }
}
