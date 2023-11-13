package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.GroupStudent;
import com.plantree.memberservice.domain.group.domain.Nest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class GroupNestSearchResponseDto {

    private NestInfoResponseDto nest;
    private List<GroupInfoResponseDto> groups;

    public GroupNestSearchResponseDto(Nest nest, List<GroupStudent> groupStudents) {
        this.nest = nest == null ? null : new NestInfoResponseDto(nest);
        this.groups = groupStudents.stream()
                                   .map(GroupStudent::getGroup)
                                   .map(GroupInfoResponseDto::new)
                                   .collect(Collectors.toList());

    }

}
