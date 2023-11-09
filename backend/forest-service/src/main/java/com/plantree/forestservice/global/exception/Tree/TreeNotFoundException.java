package com.plantree.forestservice.global.exception.Tree;

import com.plantree.forestservice.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class TreeNotFoundException extends BusinessException {

    public TreeNotFoundException() {
        super(HttpStatus.NOT_FOUND.value(), "나무를 찾을 수 없습니다.");
    }

}
