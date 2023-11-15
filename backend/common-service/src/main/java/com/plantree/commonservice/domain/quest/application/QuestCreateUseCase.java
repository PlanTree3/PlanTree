package com.plantree.commonservice.domain.quest.application;

import com.plantree.commonservice.domain.quest.application.repository.QuestRepository;
import com.plantree.commonservice.domain.quest.domain.Quest;
import com.plantree.commonservice.domain.quest.dto.GroupQuestCreateReqDto;
import com.plantree.commonservice.domain.quest.dto.StudentQuestCreateReqDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.openFeign.MemberServiceClient;
import com.plantree.commonservice.global.util.AuthMemberValidator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestCreateUseCase {

    private final QuestRepository questRepository;
    private final AuthMemberValidator authMemberValidator;
    private final MemberServiceClient memberServiceClient;

    @Transactional
    public void createStudentQuest(StudentQuestCreateReqDto studentQuestCreateReqDto,
            AuthMember authMember) {

        authMemberValidator.isParentOfStudent(studentQuestCreateReqDto.getStudentId(), authMember);

        questRepository.save(Quest.builder()
                                  .title(studentQuestCreateReqDto.getTitle())
                                  .issuer(authMember.getMemberId())
                                  .acceptor(studentQuestCreateReqDto.getStudentId())
                                  .content(studentQuestCreateReqDto.getContent())
                                  .build());
    }

    @Transactional
    public void createGroupQuest(GroupQuestCreateReqDto groupQuestCreateReqDto,
            AuthMember authMember) {

        authMemberValidator.isGroupLeader(groupQuestCreateReqDto.getGroupId(), authMember);

        List<Quest> quests = memberServiceClient.getGroupMembers(
                                                        groupQuestCreateReqDto.getGroupId())
                                               .getStudentIds().stream().map(studentId -> Quest.builder()
                        .title(groupQuestCreateReqDto.getTitle())
                        .content(groupQuestCreateReqDto.getContent())
                        .issuer(authMember.getMemberId())
                        .acceptor(studentId)
                        .build()).collect(Collectors.toList());

        questRepository.saveAll(quests);

    }

}
