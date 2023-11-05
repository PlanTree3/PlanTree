package com.plantree.forestservice.domain.tree.infra.database.querydsl;

import com.plantree.forestservice.domain.branch.domain.QBranch;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public Tree findCurrentTreeByMemberId(UUID memberId){
        LocalDate now = LocalDate.now();
        DayOfWeek currentDayOfWeek = now.getDayOfWeek();
        LocalDate nextSunday = now.plusDays(DayOfWeek.SUNDAY.getValue() - currentDayOfWeek.getValue());
        System.out.println(nextSunday);

        return jpaQueryFactory.selectFrom(tree)
                .where(tree.studentId.eq(memberId).and(tree.endedAt.eq(nextSunday)))
                .fetchFirst();
    }

}
