package com.plantree.memberservice.domain.member.infra.query;

import com.plantree.memberservice.domain.group.domain.QGroup;
import com.plantree.memberservice.domain.group.domain.QGroupStudent;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.QMember;
import com.plantree.memberservice.domain.member.domain.QParent;
import com.plantree.memberservice.domain.member.domain.QStudent;
import com.plantree.memberservice.domain.member.domain.QTeacher;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QMember member = QMember.member;
    private final QStudent student = QStudent.student;
    private final QTeacher teacher = QTeacher.teacher;
    private final QParent parent = QParent.parent;
    private final QGroupStudent studentGroup = QGroupStudent.groupStudent;
    private final QGroup group = QGroup.group;

    public Member findByIdWithRoles(UUID memberId) {
        return jpaQueryFactory.selectFrom(member)
                              .leftJoin(member.student, student)
                              .fetchJoin()
                              .leftJoin(member.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(member.parent, parent)
                              .fetchJoin()
                              .where(member.id.eq(memberId))
                              .fetchOne();
    }

    public Member findByIdWithGroup(UUID memberId) {
        return jpaQueryFactory.selectFrom(member)
                              .leftJoin(member.student, student)
                              .fetchJoin()
                              .leftJoin(student.studentGroups, studentGroup)
                              .fetchJoin()
                              .leftJoin(studentGroup.group, group)
                              .fetchJoin()
                              .leftJoin(member.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(member.parent, parent)
                              .fetchJoin()
                              .where(member.id.eq(memberId))
                              .fetchOne();
    }
}
