package com.plantree.forestservice.domain.bud.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class BudCommentSearchResDto {

    private List<BudCommentResDto> comments;

    public BudCommentSearchResDto(List<BudCommentResDto> comments){
        this.comments = comments;
    }

}
