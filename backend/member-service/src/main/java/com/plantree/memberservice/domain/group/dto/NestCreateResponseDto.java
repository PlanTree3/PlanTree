package com.plantree.memberservice.domain.group.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class NestCreateResponseDto {

    private UUID nestId;

    public NestCreateResponseDto(UUID nestId) {
        this.nestId = nestId;
    }
}
