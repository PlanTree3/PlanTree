package com.plantree.forestservice.domain.tree.infra.database.querydsl;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TreeQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QTree tree = QTree.tree;
    private final QBranch branch = QBranch.branch;
    private final QBud bud = QBud.bud;

    public List<Branch> findTreeDetailsWithBranchAndBud(UUID branchId) {
        return jpaQueryFactory.selectFrom(branch)
                .leftJoin(branch.tree, tree)
                .fetchJoin()
                .leftJoin(branch.buds, bud)
                .fetchJoin()
                .fetch();
    }

}
