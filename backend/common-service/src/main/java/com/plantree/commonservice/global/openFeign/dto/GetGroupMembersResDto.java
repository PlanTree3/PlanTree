package com.plantree.commonservice.global.openFeign.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetGroupMembersResDto {

    private List<UUID> studentIds;

    public GetGroupMembersResDto(List<UUID> studentIds) {
        this.studentIds = studentIds;
    }

}
