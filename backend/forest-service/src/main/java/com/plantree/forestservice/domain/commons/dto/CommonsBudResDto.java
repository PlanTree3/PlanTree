package com.plantree.forestservice.domain.commons.dto;

import com.plantree.forestservice.domain.bud.domain.Bud;
import java.util.UUID;
import lombok.Getter;

@Getter
public class CommonsBudResDto {

    private UUID budId;
    private String budName;
    private boolean isComplete;

    public CommonsBudResDto(Bud bud){
        this.budId = bud.getId();
        this.budName = bud.getName();
        this.isComplete = bud.isComplete();
    }

}
