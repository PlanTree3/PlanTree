package com.plantree.forestservice.domain.bud.application;

import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Bud.BudNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BudDeleteUseCase {

    private final BudRepository budRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public void deleteBud(UUID treeId, UUID branchId, UUID budId, AuthMember authMember) {

        authMemberValidator.checkAuthMemberFromTreeId(treeId, authMember);

        budRepository.deleteById(budId);

    }
}
