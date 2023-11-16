package com.plantree.forestservice.domain.seed.infra.database;

import com.plantree.forestservice.domain.seed.application.repository.SeedRepository;
import com.plantree.forestservice.domain.seed.domain.Seed;
import com.plantree.forestservice.domain.seed.infra.database.jpa.SeedJpaRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SeedRepositoryImpl implements SeedRepository {

    private final SeedJpaRepository seedJpaRepository;

    @Override
    public Seed save(Seed seed) {
        return seedJpaRepository.save(seed);
    }

    @Override
    public Optional<Seed> findById(UUID id) {
        return seedJpaRepository.findById(id);
    }

    @Override
    public void deleteById(UUID id) {
        seedJpaRepository.deleteById(id);
    }

}
