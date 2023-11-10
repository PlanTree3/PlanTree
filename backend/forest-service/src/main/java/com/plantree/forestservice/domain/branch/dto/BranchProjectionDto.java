package com.plantree.forestservice.domain.branch.dto;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.querydsl.core.annotations.QueryProjection;
import java.util.UUID;
import lombok.Getter;

@Getter
public class BranchProjectionDto {

    private UUID branchId;
    private int totalBudCount;
    private int completedBudCount;

    @QueryProjection
    public BranchProjectionDto(Branch branch, int totalBudCount, int completedBudCount){
        this.branchId = branch.getId();
        this.totalBudCount = totalBudCount;
        this.completedBudCount = completedBudCount;
    }

}
