package com.plantree.forestservice.domain.commons.dto;

import com.plantree.forestservice.domain.tree.domain.Tree;
import lombok.Getter;

@Getter
public class CommonsMainPageResDto {

    private String treeName;
    private CommonsMainDaysResDto days;
    private long score;

    public CommonsMainPageResDto(Tree tree, CommonsMainDaysResDto days, long score){
        this.treeName = tree.getName();
        this.days = days;
        this.score = score;
    }


}
