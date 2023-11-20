package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Parent;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ParentIdsResponseDto {

    private List<UUID> parentIds;

    public ParentIdsResponseDto(Nest nest) {
        if (nest != null) {
            this.parentIds = nest.getParents()
                                 .stream()
                                 .map(Parent::getMember)
                                 .map(Member::getId)
                                 .collect(
                                         Collectors.toList());
        }
    }
}
