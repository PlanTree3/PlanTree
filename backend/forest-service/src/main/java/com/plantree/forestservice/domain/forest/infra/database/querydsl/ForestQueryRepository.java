package com.plantree.forestservice.domain.forest.infra.database.querydsl;

import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.domain.forest.domain.QForest;
import com.plantree.forestservice.domain.tree.domain.QTree;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ForestQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QForest forest = QForest.forest;

    public List<Forest> findForestsByMemberId(UUID memberId){
        return jpaQueryFactory.selectFrom(forest)
                .where(forest.studentId.eq(memberId))
                .fetch();
    }

}
