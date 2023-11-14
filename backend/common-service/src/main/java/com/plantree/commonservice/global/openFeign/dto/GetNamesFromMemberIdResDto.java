package com.plantree.commonservice.global.openFeign.dto;

import java.util.Map;
import java.util.UUID;
import lombok.Getter;

@Getter
public class GetNamesFromMemberIdResDto {

    private Map<UUID, String> names;

}
