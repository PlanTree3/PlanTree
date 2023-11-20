package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class TeacherGroupListResponseDto {

    private List<TeacherGroupResponseDto> groups;

    public TeacherGroupListResponseDto(List<Group> teacherGroups) {
        this.groups = teacherGroups.stream()
                                   .map(TeacherGroupResponseDto::new)
                                   .collect(Collectors.toList());
    }
}
