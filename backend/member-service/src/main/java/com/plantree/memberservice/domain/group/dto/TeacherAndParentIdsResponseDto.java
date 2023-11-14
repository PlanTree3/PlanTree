package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.GroupStudent;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.domain.member.domain.Teacher;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class TeacherAndParentIdsResponseDto {

    private List<UUID> teacherIds;
    private List<UUID> parentIds;

    public TeacherAndParentIdsResponseDto(Nest nest, List<GroupStudent> studentGroups) {
        if (nest != null) {
            this.parentIds = nest.getParents()
                                 .stream()
                                 .map(Parent::getMember)
                                 .map(Member::getId)
                                 .collect(
                                         Collectors.toList());
        }
        if (studentGroups != null) {
            this.teacherIds = studentGroups.stream()
                                           .map(GroupStudent::getGroup)
                                           .map(Group::getTeacher)
                                           .map(
                                                   Teacher::getMember)
                                           .map(Member::getId)
                                           .collect(Collectors.toList());
        }
    }

}
