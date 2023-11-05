package com.plantree.forestservice.domain.commons.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class CommonsDaysResDto {

    private List<CommonsBudResDto> MON;
    private List<CommonsBudResDto> TUE;
    private List<CommonsBudResDto> WED;
    private List<CommonsBudResDto> THU;
    private List<CommonsBudResDto> FRI;

    public CommonsDaysResDto(List<CommonsBudResDto> MON, List<CommonsBudResDto> TUE, List<CommonsBudResDto> WED,
                             List<CommonsBudResDto> THU, List<CommonsBudResDto> FRI){
        this.MON = MON;
        this.TUE = TUE;
        this.WED = WED;
        this.THU = THU;
        this.FRI = FRI;

    }

}
