package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Group;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;

@Getter
public class TeacherGroupResponseDto {

    private UUID groupId;
    private String groupName;
    private LocalDate createdAt;
    private int studentCount;

    public TeacherGroupResponseDto(Group group) {
        this.groupId = group.getId();
        this.groupName = group.getName();
        this.createdAt = group.getCreatedAt()
                              .toLocalDate();
        this.studentCount = group.getGroupStudents()
                                 .size();
    }
}
