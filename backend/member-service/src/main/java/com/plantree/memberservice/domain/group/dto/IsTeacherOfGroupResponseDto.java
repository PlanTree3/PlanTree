package com.plantree.memberservice.domain.group.dto;

import lombok.Getter;

@Getter
public class IsTeacherOfGroupResponseDto {

    private boolean isTeacher;

    public IsTeacherOfGroupResponseDto(boolean isTeacher) {
        this.isTeacher = isTeacher;
    }
}
