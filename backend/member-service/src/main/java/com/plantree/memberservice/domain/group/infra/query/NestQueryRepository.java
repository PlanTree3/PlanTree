package com.plantree.memberservice.domain.group.infra.query;

import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.domain.QNest;
import com.plantree.memberservice.domain.member.domain.QParent;
import com.plantree.memberservice.domain.member.domain.QStudent;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NestQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QNest nest = QNest.nest;
    private final QParent parent = QParent.parent;
    private final QStudent student = QStudent.student;

    public Nest findByIdWithParent(UUID nestId) {
        return jpaQueryFactory.selectFrom(nest)
                              .leftJoin(nest.parents, parent)
                              .fetchJoin()
                              .where(nest.id.eq(nestId))
                              .fetchOne();
    }

    public Nest findByIdWithStudent(UUID nestId) {
        return jpaQueryFactory.selectFrom(nest)
                              .leftJoin(nest.students, student)
                              .fetchJoin()
                              .where(nest.id.eq(nestId))
                              .fetchOne();
    }

    public Nest findByIdWithStudentAndParent(UUID nestId) {
        return jpaQueryFactory.selectFrom(nest)
                              .leftJoin(nest.students, student)
                              .fetchJoin()
                              .innerJoin(nest.parents, parent)
                              .fetchJoin()
                              .where(nest.id.eq(nestId))
                              .distinct()
                              .fetchOne();
    }
}
