package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.dto.client.BudCountResponseDto;
import com.plantree.memberservice.domain.member.domain.Student;
import java.util.UUID;
import lombok.Getter;

@Getter
public class StudentInfoResponseDto {

    private UUID studentId;
    private String studentName;
    private int totalBudCount;
    private int completedBudCount;


    public StudentInfoResponseDto(Student student, BudCountResponseDto budCount) {
        this.studentId = student.getMember()
                                .getId();
        this.studentName = student.getName();
        this.totalBudCount = budCount.getTotalBudCount();
        this.completedBudCount = budCount.getCompletedBudCount();
    }
}
