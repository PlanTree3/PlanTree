package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.domain.member.domain.Student;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class NestInfoResponseDto {

    private UUID nestId;
    private String nestName;
    private List<String> parents;
    private List<String> children;

    public NestInfoResponseDto(Nest nest) {
        this.nestId = nest.getId();
        this.nestName = nest.getName();
        this.parents = nest.getParents()
                           .stream()
                           .map(Parent::getName)
                           .collect(Collectors.toList());
        this.children = nest.getStudents()
                            .stream()
                            .map(Student::getName)
                            .collect(Collectors.toList());
    }
}
