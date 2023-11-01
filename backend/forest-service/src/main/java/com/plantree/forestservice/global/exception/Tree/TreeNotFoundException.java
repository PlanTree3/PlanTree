package com.plantree.forestservice.global.exception.Tree;

import com.plantree.forestservice.global.exception.BusinessException;

public class TreeNotFoundException extends BusinessException {

    public TreeNotFoundException() {
        super(500, "나무를 찾을 수 없습니다.");
    }

}
