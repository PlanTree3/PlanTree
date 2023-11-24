package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.event.BudCompletedEvent;
import com.plantree.forestservice.global.event.EventProducer;
import com.plantree.forestservice.global.event.ForestEvent;
import com.plantree.forestservice.global.event.ForestEventDetail;
import com.plantree.forestservice.global.event.ForestEventType;
import com.plantree.forestservice.global.exception.Bud.BudNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BudUpdateUseCase {

    private final BudRepository budRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public void updateDay(UUID treeId, UUID branchId, UUID budId, Day dayOfWeek,
            AuthMember authMember) {

        authMemberValidator.checkAuthMemberFromTreeId(treeId, authMember);

        Bud bud = budRepository.findById(budId)
                               .orElseThrow(BudNotFoundException::new);
        bud.updateDay(dayOfWeek);
    }

    @Transactional
    public void completeBud(UUID treeId, UUID branchId, UUID budId, Day day,
            AuthMember authMember) {

        authMemberValidator.checkAuthMemberFromTreeId(treeId, authMember);

        Bud bud = budRepository.findById(budId)
                               .orElseThrow(BudNotFoundException::new);
        bud.complete();
        bud.updateDay(day);
        produceBudCompletedEvent(bud, treeId);
    }

    @Transactional
    public void undoCompleteBud(UUID treeId, UUID branchId, UUID budId,
            Day day, AuthMember authMember) {
        authMemberValidator.checkAuthMemberFromTreeId(treeId, authMember);

        Bud bud = budRepository.findById(budId)
                               .orElseThrow(BudNotFoundException::new);
        bud.undoComplete();
        bud.updateDay(day);
    }

    @Transactional
    public void updateName(UUID treeId, UUID branchId, UUID budId, String name,
            AuthMember authMember) {
        authMemberValidator.checkAuthMemberFromTreeId(treeId, authMember);

        Bud bud = budRepository.findById(budId)
                               .orElseThrow(BudNotFoundException::new);
        bud.updateName(name);
    }

    private void produceBudCompletedEvent(Bud bud, UUID treeId) {
        ForestEventDetail detail = BudCompletedEvent.builder()
                                                    .studentId(bud.getStudentId())
                                                    .budId(bud.getId())
                                                    .budName(bud.getName())
                                                    .build();
        ForestEvent event = ForestEvent.builder()
                                       .treeId(treeId)
                                       .type(ForestEventType.STU_COM_BUD)
                                       .detail(detail)
                                       .build();
        EventProducer.send(event);
    }

}
