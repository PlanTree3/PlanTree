package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.bud.application.repository.BudCommentRepository;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.BudComment;
import com.plantree.forestservice.domain.bud.domain.BudCommentCreatedEvent;
import com.plantree.forestservice.domain.bud.dto.BudCommentResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.event.EventProducer;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdReqDto;
import com.plantree.forestservice.global.openFeign.dto.GetNamesFromMemberIdResDto;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BudCommentCreateUseCase {

    private final AuthMemberValidator authMemberValidator;
    private final BudRepository budRepository;
    private final BudCommentRepository budCommentRepository;
    private final MemberServiceClient memberServiceClient;

    @Transactional
    public BudCommentResDto createBudComment(UUID treeId, UUID budId, String content,
            AuthMember authMember) {

        Bud bud = budRepository.getReferenceById(budId);
        BudComment budComment = budCommentRepository.save(BudComment.builder()
                                                                    .bud(bud)
                                                                    .writerId(
                                                                            authMember.getMemberId())
                                                                    .content(content)
                                                                    .build());

        authMemberValidator.validateAuthMember(bud.getStudentId(), authMember);

        List<UUID> memberId = Collections.singletonList(authMember.getMemberId());
        GetNamesFromMemberIdResDto resDto = memberServiceClient.getNamesFromMember(
                new GetNamesFromMemberIdReqDto(memberId));

        BudCommentCreatedEvent event = BudCommentCreatedEvent.builder()
                                                             .treeId(treeId)
                                                             .memberId(authMember.getMemberId())
                                                             .studentId(bud.getStudentId())
                                                             .role(authMember.getRole())
                                                             .budId(bud.getId())
                                                             .budName(bud.getName())
                                                             .build();
        EventProducer.send(event);
        return BudCommentResDto.builder()
                               .name(resDto.getNames()
                                           .get(authMember.getMemberId()))
                               .role(authMember.getRole()
                                               .name())
                               .budComment(budComment)
                               .build();
    }
}
