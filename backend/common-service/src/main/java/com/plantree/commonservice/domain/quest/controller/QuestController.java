package com.plantree.commonservice.domain.quest.controller;

import com.plantree.commonservice.domain.quest.application.QuestCreateUseCase;
import com.plantree.commonservice.domain.quest.application.QuestDeleteUseCase;
import com.plantree.commonservice.domain.quest.application.QuestSearchUseCase;
import com.plantree.commonservice.domain.quest.application.QuestUpdateUseCase;
import com.plantree.commonservice.domain.quest.dto.GroupQuestCreateReqDto;
import com.plantree.commonservice.domain.quest.dto.QuestUpdateReqDto;
import com.plantree.commonservice.domain.quest.dto.StudentQuestCreateReqDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.config.webmvc.JwtLoginMember;
import com.plantree.commonservice.global.responseType.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        return HttpResponse.ok(HttpStatus.OK, "학생 퀘스트를 생성하였습니다.");

    }

    @PostMapping("group-quest")
    public ResponseEntity<?> addGroupQuest(@RequestBody GroupQuestCreateReqDto groupQuestCreateReqDto,
            @JwtLoginMember AuthMember authMember){

        questCreateUseCase.createGroupQuest(groupQuestCreateReqDto, authMember);
        return HttpResponse.ok(HttpStatus.OK, "그룹 퀘스트를 생성하였습니다.");

    }

    @PatchMapping("quest/{questId}")
    public ResponseEntity<?> modifyQuest(@RequestBody QuestUpdateReqDto questUpdateReqDto,
            @PathVariable UUID questId,
            @JwtLoginMember AuthMember authMember){

        questUpdateUseCase.updateQuest(questId, questUpdateReqDto, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트를 수정하였습니다.");

    }

    @PatchMapping("quest/{questId}/accept")
    public ResponseEntity<?> acceptQuest(@PathVariable UUID questId,
            @JwtLoginMember AuthMember authMember){

        questUpdateUseCase.acceptQuest(questId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트를 수락하였습니다.");

    }

    @PatchMapping("quest/{questId}/giveup")
    public ResponseEntity<?> giveupQuest(@PathVariable UUID questId,
            @JwtLoginMember AuthMember authMember){

        questDeleteUseCase.giveupQuest(questId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트를 포기하였습니다.");

    }

    @PatchMapping("quest/{questId}/success-request")
    public ResponseEntity<?> requestQuestSuccess(@PathVariable UUID questId,
            @JwtLoginMember AuthMember authMember){

        questUpdateUseCase.questSuccessRequest(questId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트 성공을 요청하였습니다.");

    }

    @PatchMapping("quest/{questId}/success-accept")
    public ResponseEntity<?> acceptQuestSuccess(@PathVariable UUID questId,
            @JwtLoginMember AuthMember authMember){

        questUpdateUseCase.questSuccessAccept(questId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트 성공을 수락하였습니다.");

    }

    @PatchMapping("quest/{questId}/check")
    public ResponseEntity<?> checkQuest(@PathVariable UUID questId,
            @JwtLoginMember AuthMember authMember){

        questUpdateUseCase.checkQuest(questId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "퀘스트를 확인하였습니다.");

    }

}
