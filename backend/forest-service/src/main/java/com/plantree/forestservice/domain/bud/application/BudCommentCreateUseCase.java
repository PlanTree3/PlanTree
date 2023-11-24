package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.bud.application.repository.BudCommentRepository;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.BudComment;
import com.plantree.forestservice.domain.bud.dto.BudCommentResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.event.BudCommentCreatedByParentEvent;
import com.plantree.forestservice.global.event.BudCommentCreatedByStudentEvent;
import com.plantree.forestservice.global.event.BudCommentCreatedByTeacherEvent;
import com.plantree.forestservice.global.event.EventProducer;
import com.plantree.forestservice.global.event.ForestEvent;
import com.plantree.forestservice.global.event.ForestEventDetail;
import com.plantree.forestservice.global.event.ForestEventType;
import com.plantree.forestservice.global.exception.UnauthorizedAccessException;
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

        produceBudCommentCreatedEvent(authMember, bud, treeId);
        return BudCommentResDto.builder()
                               .name(resDto.getNames()
                                           .get(authMember.getMemberId()))
                               .role(authMember.getRole()
                                               .name())
                               .budComment(budComment)
                               .build();
    }

    private void produceBudCommentCreatedEvent(AuthMember authMember, Bud bud, UUID treeId) {
        ForestEventDetail detail;
        ForestEventType type;
        switch (authMember.getRole()) {
            case STUDENT:
                detail = BudCommentCreatedByStudentEvent.builder()
                                                        .studentId(bud.getStudentId())
                                                        .budId(bud.getId())
                                                        .budName(bud.getName())
                                                        .build();
                type = ForestEventType.STU_WRI_BUD;
                break;
            case PARENT:
                detail = BudCommentCreatedByParentEvent.builder()
                                                       .studentId(bud.getStudentId())
                                                       .parentId(authMember.getMemberId())
                                                       .budId(bud.getId())
                                                       .budName(bud.getName())
                                                       .build();
                type = ForestEventType.PAR_WRI_BUD;
                break;
            case TEACHER:
                detail = BudCommentCreatedByTeacherEvent.builder()
                                                        .studentId(bud.getStudentId())
                                                        .teacherId(authMember.getMemberId())
                                                        .budId(bud.getId())
                                                        .budName(bud.getName())
                                                        .build();
                type = ForestEventType.TEA_WRI_BUD;
                break;
            default:
                throw new UnauthorizedAccessException();
        }
        ForestEvent event = ForestEvent.builder()
                                       .treeId(treeId)
                                       .type(type)
                                       .detail(detail)
                                       .build();
        EventProducer.send(event);
    }
}
