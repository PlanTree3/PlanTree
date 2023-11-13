package com.plantree.memberservice.domain.group.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class TeacherGroupResponseDto {

    private String groupName;
    private LocalDate createdAt;
    private int studentCount;

    public TeacherGroupResponseDto(String groupName, LocalDateTime createdAt, int studentCount) {
        this.groupName = groupName;
        this.createdAt = createdAt.toLocalDate();
        this.studentCount = studentCount;
    }
}
