package com.plantree.forestservice.domain.forest.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class TreeListFromForestResDto {

    List<TreeFromForestResDto> trees;

    public TreeListFromForestResDto(List<TreeFromForestResDto> trees){
        this.trees = trees;
    }

}
