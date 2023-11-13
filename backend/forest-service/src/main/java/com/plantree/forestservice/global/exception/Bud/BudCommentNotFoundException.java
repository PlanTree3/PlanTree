package com.plantree.forestservice.global.exception.Bud;

import com.plantree.forestservice.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class BudCommentNotFoundException extends BusinessException {

    public BudCommentNotFoundException() {
        super(HttpStatus.NOT_FOUND.value(), "봉오리 댓글을 찾을 수 없습니다.");
    }


}
