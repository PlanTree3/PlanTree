package com.plantree.forestservice.domain.seed.application;

import com.plantree.forestservice.domain.seed.application.repository.SeedRepository;
import com.plantree.forestservice.domain.seed.domain.Seed;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Seed.SeedNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeedUpdateUseCase {

    private final AuthMemberValidator authMemberValidator;
    private final SeedRepository seedRepository;

    @Transactional
    public void updateName(UUID treeId, UUID branchId, UUID seedId, AuthMember authMember, String name) {
        authMemberValidator.checkOwnerOfTreeId(treeId, authMember);

        Seed seed = seedRepository.findById(seedId).orElseThrow(SeedNotFoundException::new);
        seed.updateName(name);
    }
}
