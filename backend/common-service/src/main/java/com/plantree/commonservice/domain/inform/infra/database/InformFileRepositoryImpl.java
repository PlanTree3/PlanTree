package com.plantree.commonservice.domain.inform.infra.database;

import com.plantree.commonservice.domain.inform.application.repository.InformFileRepository;
import com.plantree.commonservice.domain.inform.domain.InformFile;
import com.plantree.commonservice.domain.inform.infra.database.jpa.InformFileJpaRepository;
import com.plantree.commonservice.domain.inform.infra.database.query.InformQueryRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InformFileRepositoryImpl implements InformFileRepository {

    private final InformFileJpaRepository informFileJpaRepository;
    private final InformQueryRepository informQueryRepository;

    @Override
    public Optional<InformFile> findById(UUID informFileId){
        return informFileJpaRepository.findById(informFileId);
    }

    @Override
    public InformFile save(InformFile informFile){
        return informFileJpaRepository.save(informFile);
    }

    @Override
    public void deleteById(UUID informFileId){
        informFileJpaRepository.deleteById(informFileId);
    }

}
