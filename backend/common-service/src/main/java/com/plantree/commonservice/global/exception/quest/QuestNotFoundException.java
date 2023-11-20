package com.plantree.commonservice.global.exception.quest;

import com.plantree.commonservice.global.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class QuestNotFoundException extends BusinessException {

    public QuestNotFoundException() {
        super(HttpStatus.NOT_FOUND.value(), "퀘스트를 찾을 수 없습니다.");
    }

}
