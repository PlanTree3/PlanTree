package com.plantree.forestservice.global.exception.Bud;

import com.plantree.forestservice.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class BudNotFoundException extends BusinessException {

    public BudNotFoundException() {
        super(HttpStatus.NOT_FOUND.value(), "봉오리를 찾을 수 없습니다.");
    }

}
