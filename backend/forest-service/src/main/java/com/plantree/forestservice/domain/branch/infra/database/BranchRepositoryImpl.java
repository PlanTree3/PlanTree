package com.plantree.forestservice.domain.branch.infra.database;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.infra.database.jpa.BranchJpaRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BranchRepositoryImpl implements BranchRepository {

    private final BranchJpaRepository branchJpaRepository;

    @Override
    public Branch save(Branch branch) {
        return branchJpaRepository.save(branch);
    }
}
