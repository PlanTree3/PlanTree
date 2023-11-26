package com.plantree.forestservice.domain.commons.dto;

import com.plantree.forestservice.domain.branch.domain.Branch;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CommonsTodoBranchResDto {

    private UUID branchId;
    private String branchName;
    private String branchColor;
    private List<CommonsTodoSeedResDto> seeds;

    public CommonsTodoBranchResDto(Branch branch, List<CommonsTodoSeedResDto> seeds){
        this.branchId = branch.getId();
        this.branchName = branch.getName();
        this.branchColor = branch.getColor();
        this.seeds = seeds;
    }

    @Builder
    public CommonsTodoBranchResDto(String branchId, String branchName, String branchColor, List<CommonsTodoSeedResDto> seeds){
        this.branchId = UUID.fromString(branchId);
        this.branchName = branchName;
        this.branchColor = branchColor;
        this.seeds = seeds;
    }

}
