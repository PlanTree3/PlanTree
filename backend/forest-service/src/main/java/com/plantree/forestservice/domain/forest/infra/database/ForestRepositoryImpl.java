package com.plantree.forestservice.domain.forest.infra.database;

import com.plantree.forestservice.domain.forest.application.repository.ForestRepository;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.domain.forest.infra.database.jpa.ForestJpaRepository;
import com.plantree.forestservice.domain.forest.infra.database.querydsl.ForestQueryRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ForestRepositoryImpl implements ForestRepository {

    private final ForestJpaRepository forestJpaRepository;
    private final ForestQueryRepository forestQueryRepository;

    @Override
    public Forest save(Forest forest) {
        return forestJpaRepository.save(forest);
    }

    @Override
    public List<Forest> findForestsByMemberId(UUID memberId){
        return forestQueryRepository.findForestsByMemberId(memberId);
    }

}
