package com.plantree.memberservice.domain.group.dto;

import lombok.Getter;

@Getter
public class IsTeacherOfStudentResponseDto {

    private boolean isLeader;

    public IsTeacherOfStudentResponseDto(boolean isLeader) {
        this.isLeader = isLeader;
    }
}
