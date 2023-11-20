package com.plantree.commonservice.domain.inform.application.repository;

import com.plantree.commonservice.domain.inform.domain.Inform;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface InformRepository {

    Optional<Inform> findById(UUID informId);

    Optional<Inform> findByIdWithFiles(UUID informId);

    List<Inform> findByGroupId(UUID groupId);

    List<Inform> findByGroupIdIn(Set<UUID> groupIds);

    Inform save(Inform inform);

    void deleteById(UUID informId);
}
