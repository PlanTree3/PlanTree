package com.plantree.forestservice.domain.bud.application.repository;

import com.plantree.forestservice.domain.bud.domain.Bud;
import java.util.Optional;
import java.util.UUID;

public interface BudRepository {

    Bud save(Bud bud);

    Optional<Bud> findById(UUID id);

    void deleteById(UUID id);

}
