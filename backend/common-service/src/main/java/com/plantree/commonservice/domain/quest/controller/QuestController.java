package com.plantree.commonservice.domain.quest.controller;

import com.plantree.commonservice.domain.quest.application.QuestCreateUseCase;
import com.plantree.commonservice.domain.quest.application.QuestDeleteUseCase;
import com.plantree.commonservice.domain.quest.application.QuestSearchUseCase;
import com.plantree.commonservice.domain.quest.application.QuestUpdateUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class QuestController {

    private final QuestCreateUseCase questCreateUseCase;
    private final QuestUpdateUseCase questUpdateUseCase;
    private final QuestDeleteUseCase questDeleteUseCase;
    private final QuestSearchUseCase questSearchUseCase;


}
