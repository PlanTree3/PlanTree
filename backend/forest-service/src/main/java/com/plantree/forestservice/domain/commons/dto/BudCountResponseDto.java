package com.plantree.forestservice.domain.commons.dto;

import com.plantree.forestservice.domain.bud.domain.Bud;
import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class BudCountResponseDto {

    private UUID studentId;
    private int totalBudCount;
    private int completedBudCount;

    public BudCountResponseDto(UUID studentId, List<Bud> buds){
        this.studentId = studentId;
        this.totalBudCount = buds.size();
        this.completedBudCount = (int) buds.stream().filter(bud -> bud.isComplete()).count();
    }

}
