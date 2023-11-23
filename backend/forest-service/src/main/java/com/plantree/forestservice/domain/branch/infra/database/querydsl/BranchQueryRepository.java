package com.plantree.forestservice.domain.branch.infra.database.querydsl;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.seed.domain.QSeed;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BranchQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QTree tree = QTree.tree;
    private final QBranch branch = QBranch.branch;
    private final QBud bud = QBud.bud;
    private final QSeed seed = QSeed.seed;

    public List<Branch> findBranchesWithBudsByTreeId(UUID treeId) {
        return jpaQueryFactory.selectDistinct(branch)
                              .from(branch)
                              .where(branch.tree.id.eq(treeId))
                              .leftJoin(branch.buds, bud)
                              .fetchJoin()
                              .groupBy(branch.id, bud.id)
                              .fetch();
    }

    public List<Branch> findBranchesWithBudsAndSeedsByTreeId(UUID treeId) {
        return jpaQueryFactory.selectDistinct(branch)
                              .from(branch)
                              .where(branch.tree.id.eq(treeId))
                              .leftJoin(branch.buds, bud)
                              .fetchJoin()
                              .leftJoin(branch.seeds, seed)
                              .groupBy(branch.id, bud.id, seed.id)
                              .fetch();
    }

    public List<Branch> findBranchesWithSeedsByTreeId(UUID treeId) {
        return jpaQueryFactory.selectDistinct(branch)
                              .from(branch)
                              .where(branch.tree.id.eq(treeId))
                              .leftJoin(branch.seeds, seed)
                              .fetchJoin()
                              .fetch();
    }
}
