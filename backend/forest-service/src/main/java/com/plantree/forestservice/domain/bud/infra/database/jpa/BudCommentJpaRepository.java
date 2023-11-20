package com.plantree.forestservice.domain.bud.infra.database.jpa;

import com.plantree.forestservice.domain.bud.domain.BudComment;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudCommentJpaRepository extends JpaRepository<BudComment, Long> {

}
