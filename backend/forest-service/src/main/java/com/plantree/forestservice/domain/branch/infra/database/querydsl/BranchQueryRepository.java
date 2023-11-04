package com.plantree.forestservice.domain.branch.infra.database.querydsl;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.branch.dto.BranchProjectionDto;
import com.plantree.forestservice.domain.branch.dto.QBranchProjectionDto;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.plantree.forestservice.domain.tree.dto.BranchResDto;
import com.plantree.forestservice.domain.tree.dto.BudResDto;
import com.plantree.forestservice.domain.tree.dto.QBranchResDto;
import com.plantree.forestservice.domain.tree.dto.QBudResDto;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class BranchQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QTree tree = QTree.tree;
    private final QBranch branch = QBranch.branch;
    private final QBud bud = QBud.bud;

    public List<Branch> findBranchesByTreeId(UUID treeId) {
        return jpaQueryFactory.selectDistinct(branch)
                .from(branch)
                .where(branch.tree.id.eq(treeId))
                .leftJoin(branch.buds, bud).fetchJoin()
                .groupBy(branch.id, bud.id)
                .fetch();
    }

}
