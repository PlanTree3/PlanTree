package com.plantree.memberservice.domain.group.dto.client;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudCountListResponseDto {

    public List<BudCountResponseDto> budCounts;
}
