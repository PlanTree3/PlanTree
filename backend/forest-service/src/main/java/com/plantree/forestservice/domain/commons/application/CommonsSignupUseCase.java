package com.plantree.forestservice.domain.commons.application;

import com.plantree.forestservice.domain.forest.application.repository.ForestRepository;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommonsSignupUseCase {

    private final ForestRepository forestRepository;
    private final TreeRepository treeRepository;

    public void createForestAndTree(UUID memberId, Long studentId) {
        Tree tree = treeRepository.save(new Tree(studentId));
        Forest forest = forestRepository.save(Forest.of(studentId, tree));
    }
}
