package com.plantree.forestservice.domain.bud.infra.database;

import com.plantree.forestservice.domain.bud.application.repository.BudCommentRepository;
import com.plantree.forestservice.domain.bud.domain.BudComment;
import com.plantree.forestservice.domain.bud.infra.database.jpa.BudCommentJpaRepository;
import com.plantree.forestservice.domain.bud.infra.database.query.BudCommentQueryRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BudCommentRepositoryImpl implements BudCommentRepository {

    private final BudCommentJpaRepository budCommentJpaRepository;
    private final BudCommentQueryRepository budCommentQueryRepository;

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

    @Override
    public List<BudComment> findBudCommentsByBudId(UUID budId){
        return budCommentQueryRepository.findBudCommentsByBudId(budId);
    }
}
