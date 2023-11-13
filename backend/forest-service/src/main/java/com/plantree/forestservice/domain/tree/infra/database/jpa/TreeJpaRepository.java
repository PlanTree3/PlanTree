package com.plantree.forestservice.domain.tree.infra.database.jpa;

import com.plantree.forestservice.domain.tree.domain.Tree;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreeJpaRepository extends JpaRepository<Tree, UUID> {

}
