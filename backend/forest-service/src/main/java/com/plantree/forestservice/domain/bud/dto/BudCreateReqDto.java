package com.plantree.forestservice.domain.bud.dto;

import com.plantree.forestservice.domain.bud.domain.Day;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BudCreateReqDto {

    private String name;
    private Day dayOfWeek;

}
