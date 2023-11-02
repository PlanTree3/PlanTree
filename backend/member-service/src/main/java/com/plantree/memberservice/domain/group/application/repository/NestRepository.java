package com.plantree.memberservice.domain.group.application.repository;

import com.plantree.memberservice.domain.group.domain.Nest;
import java.util.UUID;

public interface NestRepository {

    Nest save(Nest nest);

    Nest findByIdWithParent(UUID nestId);
}
