package com.plantree.forestservice.domain.bud.infra.database;

import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.infra.database.jpa.BudJpaRepository;
import com.plantree.forestservice.domain.bud.infra.database.query.BudQueryRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BudRepositoryImpl implements BudRepository {

    private final BudJpaRepository budJpaRepository;
    private final BudQueryRepository budQueryRepository;


    @Override
    public Bud save(Bud bud) {
        return budJpaRepository.save(bud);
    }

    @Override
    public Optional<Bud> findById(UUID id) {
        return budJpaRepository.findById(id);
    }

    @Override
    public void deleteById(UUID id) {
        budJpaRepository.deleteById(id);
    }

    @Override
    public List<Bud> findCurrentBudsByMemberId(UUID memberId) {
        return budQueryRepository.findCurrentBudsByMemberId(memberId);
    }

    @Override
    public Bud getReferenceById(UUID budId) {
        return budJpaRepository.getReferenceById(budId);
    }

    @Override
    public List<Bud> findCurrentBudsByMemberIds(List<UUID> memberIds) {
        return budQueryRepository.findCurrentBudsByMemberIds(memberIds);
    }

    @Override
    public List<Bud> findBudsAndBudCommentsByTreeId(UUID treeId) {
        return budQueryRepository.findBudsAndBudCommentsByTreeId(treeId);
    }

}
