package com.plantree.forestservice.domain.seed.application.repository;

import com.plantree.forestservice.domain.seed.domain.Seed;
import java.util.Optional;
import java.util.UUID;

public interface SeedRepository {

    Seed save(Seed seed);
    Optional<Seed> findById(UUID id);
    void deleteById(UUID id);

}
