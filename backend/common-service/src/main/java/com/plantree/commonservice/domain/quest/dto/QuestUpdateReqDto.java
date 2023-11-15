package com.plantree.commonservice.domain.quest.dto;

import com.plantree.commonservice.global.config.webmvc.AuthMember;
import lombok.Getter;

@Getter
public class QuestUpdateReqDto {

    private String title;
    private String content;

}
