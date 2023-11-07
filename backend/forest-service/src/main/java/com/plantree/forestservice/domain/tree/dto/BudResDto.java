package com.plantree.forestservice.domain.tree.dto;

import com.plantree.forestservice.domain.bud.domain.Bud;
import com.querydsl.core.annotations.QueryProjection;
import java.util.UUID;
import lombok.Getter;

@Getter
public class BudResDto {

    private UUID budId;
    private String budName;
    private boolean isComplete;

    @QueryProjection
    public BudResDto(Bud bud){
        this.budId = bud.getId();
        this.budName = bud.getName();
        this.isComplete = bud.isComplete();
    }

}
