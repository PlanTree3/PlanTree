package com.plantree.forestservice.domain.bud.dto;

import com.plantree.forestservice.domain.bud.domain.Bud;
import java.util.UUID;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BudCreateResDto {

    private UUID budId;

    public BudCreateResDto(Bud bud){
        this.budId = bud.getId();
    }

}
