package com.plantree.forestservice.domain.tree.infra.database.jpa;

import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TreeRepositoryImpl implements TreeRepository {

    private final TreeJpaRepository treeJpaRepository;

    @Override
    public Tree save(Tree tree) {
        return treeJpaRepository.save(tree);
    }
}
