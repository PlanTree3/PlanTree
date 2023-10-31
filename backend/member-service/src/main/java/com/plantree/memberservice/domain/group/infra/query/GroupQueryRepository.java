package com.plantree.memberservice.domain.group.infra.query;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.QGroup;
import com.plantree.memberservice.domain.group.domain.QGroupStudent;
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

    private final QGroupStudent groupStudent = QGroupStudent.groupStudent;

    public Group findByIdWithTeacher(UUID groupId) {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.teacher, teacher)
                              .fetchJoin()
                              .where(group.id.eq(groupId))
                              .fetchOne();
    }

    public Group findByIdWithGroupStudents(UUID groupId) {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.groupStudents, groupStudent)
                              .fetchJoin()
                              .where(group.id.eq(groupId))
                              .fetchOne();
    }

}
