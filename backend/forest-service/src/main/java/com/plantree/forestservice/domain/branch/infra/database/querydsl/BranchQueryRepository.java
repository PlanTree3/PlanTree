package com.plantree.forestservice.domain.branch.infra.database.querydsl;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.branch.dto.BranchProjectionDto;
import com.plantree.forestservice.domain.branch.dto.QBranchProjectionDto;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.plantree.forestservice.domain.tree.dto.BranchResDto;
import com.plantree.forestservice.domain.tree.dto.BudResDto;
import com.plantree.forestservice.domain.tree.dto.QBranchResDto;
import com.plantree.forestservice.domain.tree.dto.QBudResDto;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
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

    public List<BranchProjectionDto> findBranchesByTreeId(UUID treeId) {
        return jpaQueryFactory.select(
                        new QBranchProjectionDto(branch, branch.buds.size(), branch.buds.size()))
                .from(branch)
                .where(branch.tree.id.eq(treeId))
                .leftJoin(branch.buds, bud).fetchJoin()
                .fetch();
    }

    public List<BranchResDto> findBranches(UUID treeId) {
        List<BranchResDto> result = jpaQueryFactory.select(
                        new QBranchResDto(branch,
                                bud.branch.count()))
                .from(branch)
                .leftJoin(branch.buds, bud)
                .fetchJoin()
                .where(branch.tree.id.eq(treeId))
                .groupBy(branch.id)
                .fetch();
//        log.info(result.toString());
        return result;
    }

    private Long findTotalCount(QBranch branch) {
        return JPAExpressions.select(branch.count())
                .from(branch)
                .fetchOne();
    }

    private List<BudResDto> findBuds(QBranch branch) {
        List<BudResDto> budResDtos = jpaQueryFactory.select(new QBudResDto(bud))
                .from(bud)
                .where(bud.branch.eq(branch))
                .fetch();
        return budResDtos;
    }

    private JPQLQuery<Integer> countTotalBuds(QBranch branch) {
        return JPAExpressions.select(branch.buds.size().intValue())
                .from(branch)
                .groupBy(branch);
    }

    private JPQLQuery<Integer> countCompletedBuds(QBranch branch) {
        return JPAExpressions.select(branch.buds.size())
                .from(branch)
                .leftJoin(branch.buds, bud)
                .where(bud.isComplete.isTrue())
                .groupBy(branch);
    }

}
