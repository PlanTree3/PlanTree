package com.plantree.commonservice.domain.quest.dto;

import java.util.UUID;
import lombok.Getter;

@Getter
public class QuestCreateReqDto {

    private String title;
    private String content;
    private UUID studentId;

}
