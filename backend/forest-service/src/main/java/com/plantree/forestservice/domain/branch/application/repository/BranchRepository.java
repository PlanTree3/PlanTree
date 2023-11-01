package com.plantree.forestservice.domain.branch.application.repository;

import com.plantree.forestservice.domain.branch.domain.Branch;
import org.springframework.stereotype.Repository;

@Repository
public interface BranchRepository {

    Branch save(Branch branch);

}
