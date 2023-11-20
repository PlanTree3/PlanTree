package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.member.domain.Student;
import java.util.UUID;
import lombok.Getter;

@Getter
public class GroupWaitingStudentInfoResponseDto {

    private UUID studentId;
    private String studentName;

    public GroupWaitingStudentInfoResponseDto(Student student) {
        this.studentId = student.getMember()
                                .getId();
        this.studentName = student.getName();
    }
}
