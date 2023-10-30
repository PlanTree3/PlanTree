package com.plantree.memberservice.domain.group.infra;

import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.infra.jpa.NestJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NestRepositoryImpl implements NestRepository {

    private final NestJpaRepository nestJpaRepository;

    @Override
    public Nest save(Nest nest) {
        return nestJpaRepository.save(nest);
    }
}
