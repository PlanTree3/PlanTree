package com.plantree.commonservice.domain.inform.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class InformCreateResponseDto {

    private UUID informId;

    public InformCreateResponseDto(UUID informId) {
        this.informId = informId;
    }
}
