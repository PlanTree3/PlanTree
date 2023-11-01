package com.plantree.forestservice.global.openFeign.dto;

import lombok.Getter;

@Getter
public class CheckNestParentResDto {

    private boolean isParent;

    public CheckNestParentResDto(boolean isParent){
        this.isParent = isParent;
    }
}
