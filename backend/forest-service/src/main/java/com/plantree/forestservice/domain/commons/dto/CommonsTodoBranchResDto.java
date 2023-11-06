package com.plantree.forestservice.domain.commons.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class CommonsTodoBranchResDto {

    private UUID branchId;
    private String branchName;
    private String color;
    private List<CommonsTodoSeedResDto> seeds;

}
