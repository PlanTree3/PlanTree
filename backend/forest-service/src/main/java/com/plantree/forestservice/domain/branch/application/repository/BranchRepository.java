package com.plantree.forestservice.domain.branch.application.repository;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.dto.BranchProjectionDto;
import com.plantree.forestservice.domain.tree.dto.BranchResDto;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BranchRepository {

    Branch save(
            Branch branch);

    Optional<Branch> findById(UUID id);

    void deleteById(UUID id);

    List<BranchProjectionDto> findBranchesByTreeId(UUID treeId);

    List<BranchResDto> findBranches(UUID treeId);

}
