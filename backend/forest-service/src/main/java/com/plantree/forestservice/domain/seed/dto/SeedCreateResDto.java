package com.plantree.forestservice.domain.seed.dto;

import com.plantree.forestservice.domain.seed.domain.Seed;
import java.util.UUID;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class SeedCreateResDto {

    private UUID seedId;

    public SeedCreateResDto(Seed seed){
        this.seedId = seed.getId();
    }

}
