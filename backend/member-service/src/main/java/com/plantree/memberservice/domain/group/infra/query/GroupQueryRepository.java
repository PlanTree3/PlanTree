package com.plantree.memberservice.domain.group.infra.query;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.QGroup;
import com.plantree.memberservice.domain.member.domain.QTeacher;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QGroup group = QGroup.group;
    private final QTeacher teacher = QTeacher.teacher;

    public Group findByIdWithTeacher(UUID groupId) {
        return jpaQueryFactory.selectFrom(group)
                              .innerJoin(group.teacher, teacher)
                              .fetchJoin()
                              .where(group.id.eq(groupId))
                              .fetchOne();
    }

}
