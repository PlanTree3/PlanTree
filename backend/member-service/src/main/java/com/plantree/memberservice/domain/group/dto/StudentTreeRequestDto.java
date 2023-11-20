package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Student;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class StudentTreeRequestDto {

    private List<UUID> studentIds;

    public StudentTreeRequestDto(List<Student> students) {
        this.studentIds = students.stream()
                                  .map(Student::getMember)
                                  .map(Member::getId)
                                  .collect(Collectors.toList());
    }
}
