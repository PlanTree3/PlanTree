package com.plantree.forestservice.domain.seed.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SeedModifyReqDto {

    private String name;

    public SeedModifyReqDto(String name){
        this.name = name;
    }

}
