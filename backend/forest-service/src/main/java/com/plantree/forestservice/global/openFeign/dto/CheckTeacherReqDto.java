package com.plantree.forestservice.global.openFeign.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class CheckTeacherReqDto {

    private UUID studentId;
    private UUID teacherId;

    public CheckTeacherReqDto(UUID studentId, UUID teacherId){
        this.studentId = studentId;
        this.teacherId = teacherId;
    }

}
