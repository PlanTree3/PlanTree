package com.plantree.forestservice.domain.forest.application.repository;

import com.plantree.forestservice.domain.forest.domain.Forest;
import java.util.List;
import java.util.UUID;

public interface ForestRepository {

    Forest save(Forest forest);

    List<Forest> findForestsByMemberId(UUID memberId);

    List<Forest> findAllById(List<UUID> studentIds);

    void saveAll(List<Forest> forests);
}
