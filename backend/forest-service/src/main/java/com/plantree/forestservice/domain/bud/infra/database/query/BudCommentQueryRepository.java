package com.plantree.forestservice.domain.bud.infra.database.query;

import com.plantree.forestservice.domain.bud.domain.BudComment;
import com.plantree.forestservice.domain.bud.domain.QBud;
import com.plantree.forestservice.domain.bud.domain.QBudComment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BudCommentQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QBud bud = QBud.bud;
    private final QBudComment budComment = QBudComment.budComment;

    public List<BudComment> findBudCommentsByBudId(UUID budId){
        return jpaQueryFactory.selectFrom(budComment)
                .where(budComment.bud.id.eq(budId))
                .fetch();
    }

}
