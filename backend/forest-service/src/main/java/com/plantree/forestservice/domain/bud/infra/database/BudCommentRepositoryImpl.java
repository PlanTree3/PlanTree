package com.plantree.forestservice.domain.bud.infra.database;

import com.plantree.forestservice.domain.bud.application.repository.BudCommentRepository;
import com.plantree.forestservice.domain.bud.domain.BudComment;
import com.plantree.forestservice.domain.bud.infra.database.jpa.BudCommentJpaRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BudCommentRepositoryImpl implements BudCommentRepository {

    private final BudCommentJpaRepository budCommentJpaRepository;
    @Override
    public BudComment save(BudComment budComment) {
        return budCommentJpaRepository.save(budComment);
    }

    @Override
    public Optional<BudComment> findById(Long commentId) {
        return budCommentJpaRepository.findById(commentId);
    }

    @Override
    public void deleteById(Long commentId) {
        budCommentJpaRepository.deleteById(commentId);
    }
}
