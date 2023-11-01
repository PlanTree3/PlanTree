package com.plantree.forestservice.global.openFeign.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class CheckGroupLeaderReqDto {

    private UUID teacherId;
    private Long groupId;

    public CheckGroupLeaderReqDto(UUID teacherId, Long groupId){
        this.teacherId = teacherId;
        this.groupId = groupId;
    }

}
