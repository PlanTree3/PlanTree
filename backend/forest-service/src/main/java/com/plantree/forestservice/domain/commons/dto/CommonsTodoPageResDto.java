package com.plantree.forestservice.domain.commons.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
public class CommonsTodoPageResDto {

    private UUID branchId;
    private String branchName;
    private List<CommonsTodoBranchResDto> branches;
    private List<CommonsTodoBudResDto> buds;

}
