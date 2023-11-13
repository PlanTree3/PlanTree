package com.plantree.forestservice.domain.bud.infra.database.query;

import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.util.DateHelper;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BudQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QTree tree = QTree.tree;
    private final QBranch branch = QBranch.branch;
    private final QBud bud = QBud.bud;
    private final DateHelper dateHelper;

    public List<Bud> findCurrentBudsByMemberId(UUID memberId) {
        return jpaQueryFactory.select(bud)
                .from(bud)
                .where(bud.branch.tree.eq(findCurrentTree(memberId)))
                .fetch();
    }

    public List<Bud> findCurrentBudsByMemberIds(List<UUID> memberIds) {
        LocalDate nextSunday = dateHelper.findNextSunday();

        return jpaQueryFactory.selectFrom(bud)
                .where(bud.studentId.in(memberIds)
                        .and(bud.branch.tree.in(findCurrentTrees(memberIds))))
                .fetch();
    }

    private JPQLQuery<Tree> findCurrentTrees(List<UUID> memberIds) {
        LocalDate nextSunday = dateHelper.findNextSunday();
        return JPAExpressions.selectFrom(tree)
                .where(tree.studentId.in(memberIds).and(tree.endedAt.eq(nextSunday)));
    }

    private JPQLQuery<Tree> findCurrentTree(UUID memberId) {
        LocalDate nextSunday = dateHelper.findNextSunday();
        return JPAExpressions.selectFrom(tree)
                .where(tree.studentId.eq(memberId).and(tree.endedAt.eq(nextSunday)));
    }

}
