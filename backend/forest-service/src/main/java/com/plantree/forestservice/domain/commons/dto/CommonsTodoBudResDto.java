package com.plantree.forestservice.domain.commons.dto;

import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class CommonsTodoBudResDto {

    private UUID branchId;
    private String branchColor;
    private UUID budId;
    private String budName;
    private Day dayOfWeek;

    public CommonsTodoBudResDto(Bud bud, String color){
        this.budId = bud.getId();
        this.budName = bud.getName();
        this.dayOfWeek = bud.getDay();
    }

}
