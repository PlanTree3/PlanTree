package com.plantree.forestservice.domain.branch.application.repository;

import com.plantree.forestservice.domain.branch.domain.Branch;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Repository;

public interface BranchRepository {

    Branch save(Branch branch);
    Optional<Branch> findById(UUID id);
    void deleteById(UUID id);

}
