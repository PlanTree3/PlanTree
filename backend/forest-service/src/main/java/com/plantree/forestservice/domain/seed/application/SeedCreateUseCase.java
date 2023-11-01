package com.plantree.forestservice.domain.seed.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.seed.application.repository.SeedRepository;
import com.plantree.forestservice.domain.seed.domain.Seed;
import com.plantree.forestservice.domain.seed.dto.SeedCreateResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Branch.BranchNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SeedCreateUseCase {

    private final SeedRepository seedRepository;
    private final BranchRepository branchRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public SeedCreateResDto createSeed(UUID treeId, UUID branchId, AuthMember authMember,
            String name) {

        authMemberValidator.checkOwnerOfTreeId(treeId, authMember);
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(BranchNotFoundException::new);
        Seed seed = seedRepository.save(Seed.builder()
                .name(name)
                .branch(branch)
                .build());
        return new SeedCreateResDto(seed.getId());

    }

}
