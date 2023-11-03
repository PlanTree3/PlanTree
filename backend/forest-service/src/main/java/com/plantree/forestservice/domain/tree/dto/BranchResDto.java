package com.plantree.forestservice.domain.tree.dto;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.querydsl.core.annotations.QueryProjection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class BranchResDto {

    private UUID branchId;
    private String branchName;
//    private List<BudResDto> buds;
    private Long totalBudCount;
//    private Long completedBudCount;

    @QueryProjection
    public BranchResDto(Branch branch,
//            List<Bud> buds,
            Long totalBudCount
//            , Long completedBudCount
    ) {
        this.branchId = branch.getId();
        this.branchName = branch.getName();
//        this.buds = buds.stream().map(bud -> new BudResDto(bud)).collect(Collectors.toList());;
        this.totalBudCount = totalBudCount;
//        this.completedBudCount = completedBudCount;
    }

}
