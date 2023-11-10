package com.plantree.forestservice.global.exception.Branch;

import com.plantree.forestservice.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class BranchNotFoundException extends BusinessException {

    public BranchNotFoundException() {
        super(HttpStatus.NOT_FOUND.value(), "가지를 찾을 수 없습니다.");
    }

}
