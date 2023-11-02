package com.plantree.forestservice.domain.forest.infra.database;

import com.plantree.forestservice.domain.forest.application.repository.ForestRepository;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.domain.forest.infra.database.jpa.ForestJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ForestRepositoryImpl implements ForestRepository {

    private final ForestJpaRepository forestJpaRepository;

    @Override
    public Forest save(Forest forest) {
        return forestJpaRepository.save(forest);
    }
}
