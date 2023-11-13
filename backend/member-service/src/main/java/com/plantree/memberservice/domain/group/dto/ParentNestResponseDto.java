package com.plantree.memberservice.domain.group.dto;

import com.plantree.memberservice.domain.group.domain.Nest;
import lombok.Getter;

@Getter
public class ParentNestResponseDto {

    private NestInfoResponseDto nest;

    public ParentNestResponseDto() {
    }

    public ParentNestResponseDto(Nest nest) {
        this.nest = new NestInfoResponseDto(nest);
    }
}
