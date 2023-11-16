package com.plantree.forestservice.domain.forest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plantree.forestservice.domain.tree.domain.Tree;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;

@Getter
public class TreeFromForestResDto {

    private UUID treeId;
    private String treeName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startedAt;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endedAt;

    private int totalBudCount;
    private int completedBudCount;

    public TreeFromForestResDto(Tree tree) {
        this.treeId = tree.getId();
        this.treeName = tree.getName();
        this.startedAt = tree.getStartedAt();
        this.endedAt = tree.getEndedAt();
        this.totalBudCount = tree.getBranches().stream().mapToInt(branch -> branch.getBuds().size())
                .sum();
        this.completedBudCount = (int) tree.getBranches().stream()
                .flatMap(branch -> branch.getBuds().stream().filter(bud -> bud.isComplete()))
                .count();
    }

}
