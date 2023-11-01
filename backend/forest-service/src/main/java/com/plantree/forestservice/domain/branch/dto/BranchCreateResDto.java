package com.plantree.forestservice.domain.branch.dto;

import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class BranchCreateResDto {

    private UUID branchId;
    private String branchColor;

    @Builder
    public BranchCreateResDto(UUID branchId, String branchColor){
        this.branchId = branchId;
        this.branchColor = branchColor;
    }

}
