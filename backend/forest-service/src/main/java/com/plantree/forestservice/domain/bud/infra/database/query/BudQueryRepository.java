package com.plantree.forestservice.domain.bud.infra.database.query;

import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.querydsl.jpa.JPAExpressions;
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

    public List<Bud> findCurrentBudsByMemberId(UUID memberId) {
        LocalDate now = LocalDate.now();
        DayOfWeek currentDayOfWeek = now.getDayOfWeek();
        LocalDate nextSunday = now.plusDays(DayOfWeek.SUNDAY.getValue() - currentDayOfWeek.getValue());

        return jpaQueryFactory.select(bud)
                .from(bud)
                .where(bud.branch.tree.eq(JPAExpressions.selectFrom(tree)
                        .where(tree.studentId.eq(memberId).and(tree.endedAt.eq(nextSunday)))))
                .fetch();
    }
}
