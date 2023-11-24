package com.plantree.forestservice.global.openFeign.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class CheckNestParentResDto {

    private boolean isParent;

    public CheckNestParentResDto(boolean isParent) {
        this.isParent = isParent;
    }
}
