package com.plantree.commonservice.domain.inform.infra.database;

import com.plantree.commonservice.domain.inform.application.repository.InformRepository;
import com.plantree.commonservice.domain.inform.domain.Inform;
import com.plantree.commonservice.domain.inform.infra.database.jpa.InformJpaRepository;
import com.plantree.commonservice.domain.inform.infra.database.query.InformQueryRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InformRepositoryImpl implements InformRepository {

    private final InformJpaRepository informJpaRepository;
    private final InformQueryRepository informQueryRepository;

    @Override
    public Optional<Inform> findById(UUID informId) {
        return informJpaRepository.findById(informId);
    }

    @Override
    public Optional<Inform> findByIdWithFiles(UUID informId) {
        return Optional.ofNullable(informQueryRepository.findByIdWithFiles(informId));
    }

    @Override
    public List<Inform> findByGroupId(UUID groupId) {
        return informJpaRepository.findByGroupId(groupId);
    }

    @Override
    public Inform save(Inform inform) {
        return informJpaRepository.save(inform);
    }

    @Override
    public void deleteById(UUID informId) {
        informJpaRepository.deleteById(informId);
    }

}
