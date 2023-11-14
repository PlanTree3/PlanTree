package com.plantree.memberservice.domain.group.dto;

import lombok.Getter;

@Getter
public class IsTeacherOfStudentResponseDto {

    private boolean isTeacher;

    public IsTeacherOfStudentResponseDto(boolean isTeacher) {
        this.isTeacher = isTeacher;
    }
}
