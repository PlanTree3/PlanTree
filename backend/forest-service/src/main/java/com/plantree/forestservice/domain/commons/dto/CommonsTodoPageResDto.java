package com.plantree.forestservice.domain.commons.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class CommonsTodoPageResDto {

    private List<CommonsTodoBranchResDto> branches;
    private List<CommonsTodoBudResDto> buds;

    public CommonsTodoPageResDto(List<CommonsTodoBranchResDto> branches,
            List<CommonsTodoBudResDto> buds) {
        this.branches = branches;
        this.buds = buds;
    }

}
