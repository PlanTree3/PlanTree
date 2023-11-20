package com.plantree.commonservice.global.openFeign.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckTeacherResDto {

    private boolean isLeader;

    public CheckTeacherResDto(boolean isLeader) {
        this.isLeader = isLeader;
    }

}
