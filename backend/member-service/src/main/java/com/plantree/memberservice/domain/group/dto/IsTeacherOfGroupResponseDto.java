package com.plantree.memberservice.domain.group.dto;

import lombok.Getter;

@Getter
public class IsTeacherOfGroupResponseDto {

    private boolean isLeader;

    public IsTeacherOfGroupResponseDto(boolean isLeader) {
        this.isLeader = isLeader;
    }
}
