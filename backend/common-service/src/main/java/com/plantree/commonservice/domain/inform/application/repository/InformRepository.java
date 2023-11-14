package com.plantree.commonservice.domain.inform.application.repository;

import com.plantree.commonservice.domain.inform.domain.Inform;
import java.util.Optional;
import java.util.UUID;

public interface InformRepository {

    Optional<Inform> findById(UUID informId);

    Inform save(Inform inform);

    void deleteById(UUID informId);
}
