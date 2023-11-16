package com.plantree.memberservice.domain.member.infra.query;

import com.plantree.memberservice.domain.group.domain.QGroup;
import com.plantree.memberservice.domain.group.domain.QGroupStudent;
import com.plantree.memberservice.domain.group.domain.QNest;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import com.plantree.memberservice.domain.member.domain.QMember;
import com.plantree.memberservice.domain.member.domain.QParent;
import com.plantree.memberservice.domain.member.domain.QStudent;
import com.plantree.memberservice.domain.member.domain.QTeacher;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
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
    private final QGroupStudent groupStudent = QGroupStudent.groupStudent;
    private final QGroup group = QGroup.group;
    private final QNest nest = QNest.nest;

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

    public Member findByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId) {
        return jpaQueryFactory.selectFrom(member)
                              .leftJoin(member.student, student)
                              .fetchJoin()
                              .leftJoin(member.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(member.parent, parent)
                              .fetchJoin()
                              .where(member.oauthProvider.eq(oauthProvider)
                                                         .and(member.oauthId.eq(oauthId)))
                              .fetchOne();
    }

    public Member findByIdWithGroup(UUID memberId) {
        return jpaQueryFactory.selectFrom(member)
                              .leftJoin(member.student, student)
                              .fetchJoin()
                              .leftJoin(student.studentGroups, groupStudent)
                              .fetchJoin()
                              .leftJoin(groupStudent.group, group)
                              .fetchJoin()
                              .leftJoin(member.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(member.parent, parent)
                              .fetchJoin()
                              .where(member.id.eq(memberId))
                              .fetchOne();
    }

    public Member findByIdWithGroupTeacher(UUID studentId) {
        return jpaQueryFactory.selectFrom(member)
                              .leftJoin(member.student, student)
                              .fetchJoin()
                              .leftJoin(member.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(member.parent, parent)
                              .fetchJoin()
                              .leftJoin(student.studentGroups, groupStudent)
                              .fetchJoin()
                              .leftJoin(groupStudent.group, group)
                              .fetchJoin()
                              .leftJoin(group.teacher, teacher)
                              .fetchJoin()
                              .where(member.id.eq(studentId))
                              .fetchOne();
    }

    public Member findByIdWithNestParent(UUID studentId) {
        return jpaQueryFactory.selectFrom(member)
                              .leftJoin(member.student, student)
                              .fetchJoin()
                              .leftJoin(member.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(member.parent, parent)
                              .fetchJoin()
                              .leftJoin(student.nest, nest)
                              .fetchJoin()
                              .leftJoin(nest.parents, parent)
                              .fetchJoin()
                              .where(member.id.eq(studentId))
                              .fetchOne();
    }

    public List<Member> findByIdIn(List<UUID> memberIds) {
        return jpaQueryFactory.selectFrom(member)
                              .leftJoin(member.student, student)
                              .fetchJoin()
                              .leftJoin(member.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(member.parent, parent)
                              .fetchJoin()
                              .where(member.id.in(memberIds))
                              .fetch();
    }
}
