package com.plantree.commonservice.global.openFeign.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class CheckNestParentReqDto {

    private UUID studentId;
    private UUID parentId;

    public CheckNestParentReqDto(UUID studentId, UUID parentId){
        this.studentId = studentId;
        this.parentId = parentId;
    }

}
