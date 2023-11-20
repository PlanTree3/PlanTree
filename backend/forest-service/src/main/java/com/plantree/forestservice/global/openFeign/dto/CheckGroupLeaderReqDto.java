package com.plantree.forestservice.global.openFeign.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class CheckGroupLeaderReqDto {

    private UUID teacherId;

    public CheckGroupLeaderReqDto(UUID teacherId) {
        this.teacherId = teacherId;
    }

}
