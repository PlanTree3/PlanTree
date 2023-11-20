package com.plantree.forestservice.global.openFeign.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class GetAllStudentIdsResDto {

    private List<UUID> studentIds;

}
