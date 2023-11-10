package com.plantree.forestservice.domain.bud.infra.database.jpa;

import com.plantree.forestservice.domain.bud.domain.Bud;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudJpaRepository extends JpaRepository<Bud, UUID> {

}
