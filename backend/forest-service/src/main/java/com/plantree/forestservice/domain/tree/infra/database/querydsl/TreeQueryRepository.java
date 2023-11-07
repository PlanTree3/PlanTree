package com.plantree.forestservice.domain.tree.infra.database.querydsl;

import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.util.DateHelper;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final DateHelper dateHelper;

    public Tree findCurrentTreeByMemberId(UUID memberId) {
        LocalDate now = LocalDate.now();
        DayOfWeek currentDayOfWeek = now.getDayOfWeek();
        LocalDate nextSunday = now.plusDays(
                DayOfWeek.SUNDAY.getValue() - currentDayOfWeek.getValue());

        return jpaQueryFactory.selectFrom(tree)
                .where(tree.studentId.eq(memberId).and(tree.endedAt.eq(nextSunday)))
                .fetchFirst();
    }

    public List<Tree> findTreesByForestIdAndPeriod(UUID forestId, LocalDate startedAt,
            LocalDate endedAt) {
        return jpaQueryFactory.selectFrom(tree)
                .where(tree.forest.id.eq(forestId)
                        .and(tree.startedAt.between(startedAt, endedAt)
                                .and(tree.endedAt.between(startedAt, endedAt))))
                .fetch();
    }

    public List<Tree> findTreesByStudentIds(List<UUID> studentIds) {
        return jpaQueryFactory.selectFrom(tree)
                .where(tree.studentId.in(studentIds)
                        .and(tree.endedAt.eq(dateHelper.findNextSunday())))
                .fetch();
    }
}
