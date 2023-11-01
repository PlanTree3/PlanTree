package com.plantree.forestservice.domain.seed.application;

import com.plantree.forestservice.domain.seed.application.repository.SeedRepository;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeedDeleteUseCase {

    private final AuthMemberValidator authMemberValidator;
    private final SeedRepository seedRepository;

    public void deleteSeed(UUID treeId, UUID branchId, UUID seedId, AuthMember authMember) {

        authMemberValidator.checkOwnerOfTreeId(treeId, authMember);
        seedRepository.deleteById(seedId);

    }
}
