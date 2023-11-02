package com.plantree.forestservice.domain.bud.infra.database;

import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.infra.database.jpa.BudJpaRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BudRepositoryImpl implements BudRepository {

    private final BudJpaRepository budJpaRepository;


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

}
