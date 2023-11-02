package com.plantree.memberservice.domain.group.dto.client;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudCountResponseDto {

    private UUID StudentId;
    private int totalBudCount;
    private int completedBudCount;

}
