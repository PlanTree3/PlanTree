package com.plantree.forestservice.domain.tree.dto;

import com.plantree.forestservice.domain.tree.domain.Tree;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.Getter;

@Getter
public class StudentTreeResponseDto {

    private Map<UUID, UUID> currentStudentTreeId;

    public StudentTreeResponseDto(List<Tree> trees) {
        this.currentStudentTreeId = new HashMap<>();
        trees.forEach(tree -> this.currentStudentTreeId.put(tree.getStudentId(), tree.getId()));
    }
}
