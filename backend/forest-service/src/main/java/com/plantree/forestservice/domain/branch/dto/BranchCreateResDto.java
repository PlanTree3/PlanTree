package com.plantree.forestservice.domain.branch.dto;

import com.plantree.forestservice.domain.branch.domain.Branch;
import java.util.UUID;
import lombok.Getter;

@Getter
public class BranchCreateResDto {

    private UUID branchId;
    private String branchColor;

    public BranchCreateResDto(Branch branch){
        this.branchId = branch.getId();
        this.branchColor = branch.getColor();
    }

}
