package com.plantree.forestservice.domain.tree.application.repository;

import com.plantree.forestservice.domain.tree.domain.Tree;

public interface TreeRepository {
    Tree save(Tree tree);
}
