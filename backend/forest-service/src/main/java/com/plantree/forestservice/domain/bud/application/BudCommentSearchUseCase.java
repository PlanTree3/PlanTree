package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.bud.application.repository.BudCommentRepository;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.BudComment;
import com.plantree.forestservice.domain.bud.dto.BudCommentResDto;
import com.plantree.forestservice.domain.bud.dto.BudCommentSearchResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdReqDto;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdResDto;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BudCommentSearchUseCase {

    private final BudCommentRepository budCommentRepository;
    private final BudRepository budRepository;
    private final MemberServiceClient memberServiceClient;

    public BudCommentSearchResDto findComments(UUID treeId, UUID budId, AuthMember authMember) {

        List<BudComment> budComments = budCommentRepository.findBudCommentsByBudId(budId);
        List<UUID> memberIds = budComments.stream().map(budComment -> budComment.getWriterId())
                .collect(Collectors.toList());
        GetNamesFromMemberIdResDto resDto = memberServiceClient.getNamesFromMember(
                new GetNamesFromMemberIdReqDto(memberIds));

        List<BudCommentResDto> budCommentResDtos = budComments.stream().map(budComment ->
                BudCommentResDto.builder()
                        .budComment(budComment)
                        .name(resDto.getNames().get(budComment.getWriterId()))
                        .role(authMember.getRole().name())
                        .build()).collect(Collectors.toList());
        return new BudCommentSearchResDto(budCommentResDtos);

    }
}
