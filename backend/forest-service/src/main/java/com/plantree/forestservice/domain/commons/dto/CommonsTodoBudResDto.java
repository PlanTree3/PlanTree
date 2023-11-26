package com.plantree.forestservice.domain.commons.dto;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CommonsTodoBudResDto {

    private UUID branchId;
    private String branchColor;
    private UUID budId;
    private String budName;
    private boolean isComplete;
    private int commentCount;
    private Day dayOfWeek;

    public CommonsTodoBudResDto(Bud bud, Branch branch) {
        this.budId = bud.getId();
        this.budName = bud.getName();
        this.isComplete = bud.isComplete();
        this.branchId = branch.getId();
        this.branchColor = branch.getColor();
        this.commentCount = bud.getBudComments()
                               .size();
        this.dayOfWeek = bud.getDay();
    }

    @Builder
    public CommonsTodoBudResDto(String budId, String budName, boolean isComplete, String branchId, String branchColor,
                                int commentCount, String dayOfWeek){
        this.budId = UUID.fromString(budId);
        this.budName = budName;
        this.isComplete = isComplete;
        this.branchId = UUID.fromString(branchId);
        this.branchColor = branchColor;
        this.commentCount = commentCount;
        this.dayOfWeek = Day.valueOf(dayOfWeek);
    }

}
