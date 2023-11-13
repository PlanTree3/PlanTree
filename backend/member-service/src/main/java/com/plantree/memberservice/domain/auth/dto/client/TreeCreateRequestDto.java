package com.plantree.memberservice.domain.auth.dto.client;

import java.util.UUID;
import lombok.Getter;

@Getter
public class TreeCreateRequestDto {

    private UUID studentId;

    public TreeCreateRequestDto(UUID studentId) {
        this.studentId = studentId;
    }
}
