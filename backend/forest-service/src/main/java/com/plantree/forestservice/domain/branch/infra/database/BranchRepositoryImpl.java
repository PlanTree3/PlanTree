package com.plantree.forestservice.domain.branch.infra.database;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.infra.database.jpa.BranchJpaRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class BranchRepositoryImpl implements BranchRepository {

    private final BranchJpaRepository branchJpaRepository;

    @Override
    public Branch save(Branch branch) {
        return branchJpaRepository.save(branch);
    }

    @Override
    public Optional<Branch> findById(UUID id) {
        return branchJpaRepository.findById(id);
    }

    @Override
    public void deleteById(UUID id) {
        branchJpaRepository.deleteById(id);
    }

}
