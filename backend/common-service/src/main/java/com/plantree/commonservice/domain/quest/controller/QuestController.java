package com.plantree.commonservice.domain.quest.controller;

import com.plantree.commonservice.domain.quest.application.QuestCreateUseCase;
import com.plantree.commonservice.domain.quest.application.QuestDeleteUseCase;
import com.plantree.commonservice.domain.quest.application.QuestSearchUseCase;
import com.plantree.commonservice.domain.quest.application.QuestUpdateUseCase;
import com.plantree.commonservice.domain.quest.dto.GroupQuestCreateReqDto;
import com.plantree.commonservice.domain.quest.dto.StudentQuestCreateReqDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.config.webmvc.JwtLoginMember;
import com.plantree.commonservice.global.responseType.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class QuestController {

    private final QuestCreateUseCase questCreateUseCase;
    private final QuestUpdateUseCase questUpdateUseCase;
    private final QuestDeleteUseCase questDeleteUseCase;
    private final QuestSearchUseCase questSearchUseCase;

    @PostMapping("student-quest")
    public ResponseEntity<?> addStudentQuest(@RequestBody StudentQuestCreateReqDto studentQuestCreateReqDto,
            @JwtLoginMember AuthMember authMember){

        questCreateUseCase.createStudentQuest(studentQuestCreateReqDto, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트를 생성하였습니다.");

    }

    @PostMapping("group-quest")
    public ResponseEntity<?> addGroupQuest(@RequestBody GroupQuestCreateReqDto groupQuestCreateReqDto,
            @JwtLoginMember AuthMember authMember){

        questCreateUseCase.createGroupQuest(groupQuestCreateReqDto, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트를 생성하였습니다.");

    }


}
