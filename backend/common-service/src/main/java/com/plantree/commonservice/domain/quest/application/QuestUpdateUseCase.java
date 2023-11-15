package com.plantree.commonservice.domain.quest.application;

import com.plantree.commonservice.domain.quest.application.repository.QuestRepository;
import com.plantree.commonservice.domain.quest.domain.Quest;
import com.plantree.commonservice.domain.quest.dto.QuestUpdateReqDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.UnauthorizedAccessException;
import com.plantree.commonservice.global.exception.quest.QuestNotFoundException;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestUpdateUseCase {

    private final QuestRepository questRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public void updateQuest(UUID questId, QuestUpdateReqDto questUpdateReqDto,
            AuthMember authMember) {

        Quest quest = questRepository.findById(questId)
                                     .orElseThrow(QuestNotFoundException::new);
        validateAuthMemberAndQuestIssuer(quest.getIssuer(), authMember.getMemberId());

        quest.updateTitle(questUpdateReqDto.getTitle());
        quest.updateContent(questUpdateReqDto.getContent());

    }

    private void validateAuthMemberAndQuestIssuer(UUID issuer, UUID memberId) {
        boolean isAuthMemberQuestIssuer = issuer.equals(memberId);
        if(!isAuthMemberQuestIssuer){
            throw new UnauthorizedAccessException();
        }
    }

}
