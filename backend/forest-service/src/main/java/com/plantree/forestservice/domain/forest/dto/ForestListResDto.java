package com.plantree.forestservice.domain.forest.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class ForestListResDto {

    List<ForestResDto> forests;

    public ForestListResDto(List<ForestResDto> forests){
        this.forests = forests;
    }

}
