package com.plantree.forestservice.global.openFeign.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class CheckGroupLeaderReqDto {

    private UUID teacherId;
    private UUID groupId;

    public CheckGroupLeaderReqDto(UUID teacherId, UUID groupId) {
        this.teacherId = teacherId;
        this.groupId = groupId;
    }

}
