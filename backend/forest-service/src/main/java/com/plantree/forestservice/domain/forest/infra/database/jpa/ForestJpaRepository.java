package com.plantree.forestservice.domain.forest.infra.database.jpa;

import com.plantree.forestservice.domain.forest.domain.Forest;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForestJpaRepository extends JpaRepository<Forest, UUID> {

}
