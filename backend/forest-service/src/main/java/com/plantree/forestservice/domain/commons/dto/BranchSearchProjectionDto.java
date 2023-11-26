package com.plantree.forestservice.domain.commons.dto;

import lombok.Getter;

@Getter
public class BranchSearchProjectionDto {

    private String branchId;
    private String branchName;
    private String branchColor;
    private String seedId;
    private String seedName;
    private boolean isComplete;
    private String budId;
    private String budName;
    private String dayOfWeek;
    private int commentCount;

}
