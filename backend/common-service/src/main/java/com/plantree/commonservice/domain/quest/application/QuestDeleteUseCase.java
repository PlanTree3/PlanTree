package com.plantree.commonservice.domain.quest.application;

import com.plantree.commonservice.domain.quest.application.repository.QuestRepository;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestDeleteUseCase {

    private final AuthMemberValidator authMemberValidator;
    private final QuestRepository questRepository;

    @Transactional
    public void deleteQuest(UUID questId, AuthMember authMember) {
        questRepository.deleteById(questId);
    }

    @Transactional
    public void giveupQuest(UUID questId, AuthMember authMember) {
        authMemberValidator.ValidateAuthMemberAndQuestAcceptor(questId, authMember);
        questRepository.deleteById(questId);
    }

}
