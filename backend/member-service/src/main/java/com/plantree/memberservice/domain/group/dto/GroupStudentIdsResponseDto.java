package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.GroupStudent;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Student;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class GroupStudentIdsResponseDto {

    private List<UUID> studentIds;

    public GroupStudentIdsResponseDto(Group group) {
        this.studentIds = group.getGroupStudents()
                               .stream()
                               .map(GroupStudent::getStudent)
                               .map(Student::getMember)
                               .map(Member::getId)
                               .collect(Collectors.toList());
    }
}
