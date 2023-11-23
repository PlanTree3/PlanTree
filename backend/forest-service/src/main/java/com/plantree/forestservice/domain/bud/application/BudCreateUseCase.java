package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.event.BudCreatedEvent;
import com.plantree.forestservice.global.event.EventProducer;
import com.plantree.forestservice.global.event.ForestEvent;
import com.plantree.forestservice.global.event.ForestEventDetail;
import com.plantree.forestservice.global.event.ForestEventType;
import com.plantree.forestservice.global.exception.Branch.BranchNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BudCreateUseCase {

    private final BudRepository budRepository;
    private final BranchRepository branchRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public Bud createBud(UUID treeId, UUID branchId, String name, Day dayOfWeek,
            AuthMember authMember) {

        Branch branch = branchRepository.findById(branchId)
                                        .orElseThrow(BranchNotFoundException::new);
        authMemberValidator.checkAuthMemberFromTreeId(treeId, authMember);

        Bud bud = budRepository.save(Bud.builder()
                                        .name(name)
                                        .day(dayOfWeek)
                                        .studentId(authMember.getMemberId())
                                        .branch(branch)
                                        .build());
        produceBudCreatedEvent(bud, treeId);
        return bud;

    }

    private void produceBudCreatedEvent(Bud bud, UUID treeId) {
        ForestEventDetail detail = BudCreatedEvent.builder()
                                                  .studentId(bud.getStudentId())
                                                  .budId(bud.getId())
                                                  .budName(bud.getName())
                                                  .build();
        ForestEvent event = ForestEvent.builder()
                                       .treeId(treeId)
                                       .type(ForestEventType.STU_GEN_BUD)
                                       .detail(detail)
                                       .build();
        EventProducer.send(event);
    }
}
