package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.List;
import lombok.Getter;

@Getter
public class GroupDetailResponseDto {

    private String groupName;
    private String teacherName;
    private String teacherProfileImageUrl;
    private List<StudentInfoResponseDto> students;

    public GroupDetailResponseDto(Group group, List<StudentInfoResponseDto> students) {
        this.groupName = group.getName();
        this.teacherName = group.getTeacher()
                                .getName();
        this.teacherProfileImageUrl = group.getTeacher()
                                           .getProfileImageUrl();
        this.students = students;
    }
}
