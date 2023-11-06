package com.plantree.forestservice.domain.bud.application.repository;

import com.plantree.forestservice.domain.bud.domain.BudComment;
import java.util.Optional;

public interface BudCommentRepository {

    BudComment save(BudComment budComment);

    Optional<BudComment> findById(Long commentId);

    void deleteById(Long commentId);
}
