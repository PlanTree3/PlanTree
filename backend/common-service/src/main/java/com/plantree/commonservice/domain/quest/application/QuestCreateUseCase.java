package com.plantree.commonservice.domain.quest.application;

import com.plantree.commonservice.domain.quest.application.repository.QuestRepository;
import com.plantree.commonservice.domain.quest.domain.Quest;
import com.plantree.commonservice.domain.quest.dto.QuestCreateReqDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.config.webmvc.JwtLoginMember;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestCreateUseCase {

    private final QuestRepository questRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public void createStudentQuest(QuestCreateReqDto questCreateReqDto, AuthMember authMember) {

        authMemberValidator.isParentOfStudent(questCreateReqDto.getStudentId(), authMember);

        questRepository.save(Quest.builder()
                                  .title(questCreateReqDto.getTitle())
                                  .issuer(authMember.getMemberId())
                                  .acceptor(questCreateReqDto.getStudentId())
                                  .content(questCreateReqDto.getContent())
                                  .build());
    }
}
