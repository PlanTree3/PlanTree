package com.plantree.forestservice.domain.commons.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class BudCountListResponseDto {

    public List<BudCountResponseDto> budCounts;

    public BudCountListResponseDto(List<BudCountResponseDto> budCounts){
        this.budCounts = budCounts;
    }

}
