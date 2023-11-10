package com.plantree.forestservice.global.openFeign.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class GetNamesFromMemberIdReqDto {

    private List<UUID> memberIds;

    public GetNamesFromMemberIdReqDto(List<UUID> memberIds){
        this.memberIds = memberIds;
    }

}
