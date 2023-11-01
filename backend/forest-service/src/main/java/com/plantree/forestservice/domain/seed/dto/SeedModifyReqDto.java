package com.plantree.forestservice.domain.seed.dto;

import lombok.Getter;

@Getter
public class SeedModifyReqDto {

    private String name;

    public SeedModifyReqDto(String name){
        this.name = name;
    }

}
