package com.plantree.forestservice.domain.commons.dto;

import com.plantree.forestservice.domain.seed.domain.Seed;
import java.util.UUID;
import lombok.Getter;

@Getter
public class CommonsTodoSeedResDto {

    private UUID seedId;
    private String seedName;

    public CommonsTodoSeedResDto(Seed seed){
        this.seedId = seed.getId();
        this.seedName = seed.getName();
    }

}
