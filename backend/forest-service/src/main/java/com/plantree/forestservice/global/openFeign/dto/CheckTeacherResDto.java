package com.plantree.forestservice.global.openFeign.dto;

import lombok.Getter;

@Getter
public class CheckTeacherResDto {

    private boolean isLeader;

    public CheckTeacherResDto(boolean isLeader){
        this.isLeader = isLeader;
    }

}
