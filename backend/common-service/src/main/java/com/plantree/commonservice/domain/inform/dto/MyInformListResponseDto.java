package com.plantree.commonservice.domain.inform.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class MyInformListResponseDto {

    private List<MyInformResponseDto> informs;

    public MyInformListResponseDto(List<MyInformResponseDto> informs) {
        this.informs = informs;
    }
}
