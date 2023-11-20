package com.plantree.memberservice.domain.group.dto;

import lombok.Getter;

@Getter
public class IsTeacherOfGroupResponseDto {

    private boolean teacher;

    public IsTeacherOfGroupResponseDto(boolean teacher) {
        this.teacher = teacher;
    }
}
