package com.plantree.memberservice.domain.group.dto;

import java.util.Map;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudentTreeResponseDto {

    private Map<UUID, UUID> currentStudentTreeId;
}
