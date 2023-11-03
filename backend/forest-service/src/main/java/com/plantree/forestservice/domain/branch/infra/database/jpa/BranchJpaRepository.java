package com.plantree.forestservice.domain.branch.infra.database.jpa;

import com.plantree.forestservice.domain.branch.domain.Branch;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchJpaRepository extends JpaRepository<Branch, UUID> {

}
