package com.plantree.forestservice.domain.seed.infra.database.jpa;

import com.plantree.forestservice.domain.seed.domain.Seed;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeedJpaRepository extends JpaRepository<Seed, UUID> {

}
