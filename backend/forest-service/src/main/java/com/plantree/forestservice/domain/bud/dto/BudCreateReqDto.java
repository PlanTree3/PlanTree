package com.plantree.forestservice.domain.bud.dto;

import com.plantree.forestservice.domain.bud.domain.Day;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudCreateReqDto {

    @NotBlank
    private String name;

    @NotBlank
    private Day dayOfWeek;

}
