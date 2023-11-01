package com.plantree.forestservice.global.openFeign.dto;

import lombok.Getter;

@Getter
public class CheckGroupLeaderResDto {

    private boolean isLeader;

    public CheckGroupLeaderResDto(boolean isLeader){
        this.isLeader = isLeader;
    }

}
