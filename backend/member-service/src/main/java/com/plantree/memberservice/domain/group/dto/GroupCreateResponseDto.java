package com.plantree.memberservice.domain.group.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class GroupCreateResponseDto {

    private UUID groupId;

    public GroupCreateResponseDto(UUID groupId) {
        this.groupId = groupId;
    }
}
