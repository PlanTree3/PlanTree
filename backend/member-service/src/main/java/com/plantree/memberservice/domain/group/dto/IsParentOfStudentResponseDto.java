package com.plantree.memberservice.domain.group.dto;

import lombok.Getter;

@Getter
public class IsParentOfStudentResponseDto {

    private boolean isParent;

    public IsParentOfStudentResponseDto(boolean isParent) {
        this.isParent = isParent;
    }

}
