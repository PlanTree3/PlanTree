package com.plantree.forestservice.domain.commons.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class CommonsMainDaysResDto {

    private List<CommonsMainBudResDto> MON;
    private List<CommonsMainBudResDto> TUE;
    private List<CommonsMainBudResDto> WED;
    private List<CommonsMainBudResDto> THU;
    private List<CommonsMainBudResDto> FRI;

    public CommonsMainDaysResDto(List<CommonsMainBudResDto> MON, List<CommonsMainBudResDto> TUE, List<CommonsMainBudResDto> WED,
                             List<CommonsMainBudResDto> THU, List<CommonsMainBudResDto> FRI){
        this.MON = MON;
        this.TUE = TUE;
        this.WED = WED;
        this.THU = THU;
        this.FRI = FRI;

    }

}
