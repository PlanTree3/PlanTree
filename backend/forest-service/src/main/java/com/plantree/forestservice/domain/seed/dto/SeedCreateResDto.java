package com.plantree.forestservice.domain.seed.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class SeedCreateResDto {

    private UUID seedId;

    public SeedCreateResDto(UUID seedId){
        this.seedId = seedId;
    }

}
