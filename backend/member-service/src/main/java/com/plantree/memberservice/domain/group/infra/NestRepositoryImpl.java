package com.plantree.memberservice.domain.group.infra;

import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.infra.jpa.NestJpaRepository;
import com.plantree.memberservice.domain.group.infra.query.NestQueryRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NestRepositoryImpl implements NestRepository {

    private final NestJpaRepository nestJpaRepository;
    private final NestQueryRepository nestQueryRepository;

    @Override
    public Nest save(Nest nest) {
        return nestJpaRepository.save(nest);
    }

    @Override
    public Optional<Nest> findByIdWithParent(UUID nestId) {
        return Optional.ofNullable(nestQueryRepository.findByIdWithParent(nestId));
    }

    @Override
    public Optional<Nest> findByIdWithStudent(UUID nestId) {
        return Optional.ofNullable(nestQueryRepository.findByIdWithStudent(nestId));
    }
}
