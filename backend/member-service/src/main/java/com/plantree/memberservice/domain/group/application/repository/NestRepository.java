package com.plantree.memberservice.domain.group.application.repository;

import com.plantree.memberservice.domain.group.domain.Nest;
import java.util.Optional;
import java.util.UUID;

public interface NestRepository {

    Nest save(Nest nest);

    Optional<Nest> findByIdWithParent(UUID nestId);

    Optional<Nest> findByIdWithStudent(UUID nestId);

    Optional<Nest> findByIdWithStudentAndParent(UUID nestId);

    void delete(Nest nest);
}
