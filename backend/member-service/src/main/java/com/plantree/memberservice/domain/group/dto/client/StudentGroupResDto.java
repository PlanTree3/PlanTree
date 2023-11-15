package com.plantree.memberservice.domain.group.dto.client;

import java.util.Map;
import java.util.UUID;
import lombok.Getter;

@Getter
public class StudentGroupResDto {

    private Map<UUID, String> groupInfos;

    public StudentGroupResDto(Map<UUID, String> groupInfos) {
        this.groupInfos = groupInfos;
    }

}
