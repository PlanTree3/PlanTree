package com.plantree.memberservice.domain.group.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class StudentInfoListResponseDto {

    private List<StudentInfoResponseDto> students;

    public StudentInfoListResponseDto(List<StudentInfoResponseDto> students) {
        this.students = students;
    }
}
