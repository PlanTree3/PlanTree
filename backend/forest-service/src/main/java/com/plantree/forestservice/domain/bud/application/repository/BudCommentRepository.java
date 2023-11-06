package com.plantree.forestservice.domain.bud.application.repository;

import com.plantree.forestservice.domain.bud.domain.BudComment;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BudCommentRepository {

    BudComment save(BudComment budComment);

    Optional<BudComment> findById(Long commentId);

    void deleteById(Long commentId);

    List<BudComment> findBudCommentsByBudId(UUID budId);
}
