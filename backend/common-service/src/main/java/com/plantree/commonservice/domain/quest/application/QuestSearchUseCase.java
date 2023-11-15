package com.plantree.commonservice.domain.quest.application;

import com.plantree.commonservice.domain.quest.application.repository.QuestRepository;
import com.plantree.commonservice.domain.quest.domain.Quest;
import com.plantree.commonservice.domain.quest.dto.QuestResponseDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.quest.QuestNotFoundException;
import com.plantree.commonservice.global.openFeign.MemberServiceClient;
import com.plantree.commonservice.global.openFeign.dto.GetNamesFromMemberIdReqDto;
import com.plantree.commonservice.global.openFeign.dto.GetNamesFromMemberIdResDto;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestSearchUseCase {

    private final AuthMemberValidator authMemberValidator;
    private final QuestRepository questRepository;
    private final MemberServiceClient memberServiceClient;

    public QuestResponseDto findQuestDetails(UUID questId, AuthMember authMember) {

        Quest quest = questRepository.findById(questId)
                                     .orElseThrow(QuestNotFoundException::new);
        Map<UUID, String> names = memberServiceClient.getNamesFromMember(
                                                             new GetNamesFromMemberIdReqDto(List.of(quest.getAcceptor(), quest.getIssuer())))
                                                     .getNames();

        return QuestResponseDto.builder()
                               .quest(quest)
                               .acceptorName(names.get(quest.getAcceptor()))
                               .issuerName(names.get(quest.getIssuer()))
                               .build();

    }

    public List<QuestResponseDto> findStudentQuests(AuthMember authMember) {

        List<Quest> quests = questRepository.findByAcceptor(authMember.getMemberId());

        List<UUID> issuerIds = new ArrayList<>();
        quests.stream()
              .map(quest -> issuerIds.add(quest.getIssuer()));

        Map<UUID, String> names = memberServiceClient.getNamesFromMember(
                                                             new GetNamesFromMemberIdReqDto(issuerIds))
                                                     .getNames();

        return quests.stream().map(quest -> new QuestResponseDto(quest, names.get(quest.getIssuer()),
                names.get(quest.getAcceptor()))).collect(Collectors.toList());

    }
}
