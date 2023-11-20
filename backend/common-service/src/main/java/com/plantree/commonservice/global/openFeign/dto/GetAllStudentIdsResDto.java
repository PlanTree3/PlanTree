package com.plantree.commonservice.global.openFeign.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class GetAllStudentIdsResDto {

    private List<UUID> studentIds;

}
