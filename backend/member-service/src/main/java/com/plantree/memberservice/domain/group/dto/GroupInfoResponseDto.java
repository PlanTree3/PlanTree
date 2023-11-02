package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.UUID;
import lombok.Getter;

@Getter
public class GroupInfoResponseDto {

    private UUID groupId;
    private String groupName;

    public GroupInfoResponseDto(Group group) {
        this.groupId = group.getId();
        this.groupName = group.getName();
    }
}
