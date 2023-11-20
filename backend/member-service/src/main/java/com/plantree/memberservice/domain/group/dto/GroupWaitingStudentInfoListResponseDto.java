package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.GroupStudent;
import com.plantree.memberservice.domain.group.domain.GroupStudentState;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class GroupWaitingStudentInfoListResponseDto {

    private List<GroupWaitingStudentInfoResponseDto> joinRequestList;

    public GroupWaitingStudentInfoListResponseDto(Group group) {
        this.joinRequestList = group.getGroupStudents()
                                    .stream()
                                    .filter(groupStudent -> groupStudent.getStudentState()
                                                                        .equals(GroupStudentState.WAITING))
                                    .map(GroupStudent::getStudent)
                                    .map(GroupWaitingStudentInfoResponseDto::new)
                                    .collect(Collectors.toList());
    }
}
