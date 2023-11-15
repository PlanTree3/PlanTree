package com.plantree.commonservice.global.openFeign.dto;

import java.util.Map;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudentGroupsResDto {

    private Map<UUID, String> groupInfos;

}
