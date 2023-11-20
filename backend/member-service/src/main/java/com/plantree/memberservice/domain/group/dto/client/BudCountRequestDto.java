package com.plantree.memberservice.domain.group.dto.client;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.GroupStudentState;
import com.plantree.memberservice.domain.group.domain.Nest;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class BudCountRequestDto {

    private List<UUID> studentIds;

    public BudCountRequestDto(Group group) {
        this.studentIds = group.getGroupStudents()
                               .stream()
                               .filter(groupStudent -> groupStudent.getStudentState()
                                                                   .equals(GroupStudentState.ACTIVE))
                               .map(groupStudent -> groupStudent.getStudent()
                                                                .getMember()
                                                                .getId())
                               .collect(Collectors.toList());
    }

    public BudCountRequestDto(Nest nest) {
        this.studentIds = nest.getStudents()
                              .stream()
                              .map(student -> student.getMember()
                                                     .getId())
                              .collect(Collectors.toList());
    }
}
