package com.plantree.memberservice.domain.group.infra.query;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.QGroup;
import com.plantree.memberservice.domain.group.domain.QGroupStudent;
import com.plantree.memberservice.domain.member.domain.QMember;
import com.plantree.memberservice.domain.member.domain.QStudent;
import com.plantree.memberservice.domain.member.domain.QTeacher;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QGroup group = QGroup.group;
    private final QTeacher teacher = QTeacher.teacher;
    private final QStudent student = QStudent.student;
    private final QGroupStudent groupStudent = QGroupStudent.groupStudent;
    private final QMember member = QMember.member;

    public Group findByIdWithTeacher(UUID groupId) {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.teacher, teacher)
                              .fetchJoin()
                              .where(group.id.eq(groupId))
                              .fetchOne();
    }

    public Group findByIdWithStudents(UUID groupId) {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.groupStudents, groupStudent)
                              .fetchJoin()
                              .leftJoin(groupStudent.student, student)
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

    public Group findByIdWithTeacherAndStudents(UUID groupId) {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.groupStudents, groupStudent)
                              .fetchJoin()
                              .leftJoin(groupStudent.student, student)
                              .fetchJoin()
                              .leftJoin(group.teacher, teacher)
                              .fetchJoin()
                              .where(group.id.eq(groupId))
                              .fetchOne();
    }

    public List<Group> findTeacherGroupsByMemberId(UUID memberId) {
        return jpaQueryFactory.selectFrom(group)
                              .leftJoin(group.groupStudents, groupStudent)
                              .fetchJoin()
                              .leftJoin(group.teacher, teacher)
                              .fetchJoin()
                              .leftJoin(teacher.member, member)
                              .fetchJoin()
                              .where(member.id.eq(memberId))
                              .fetch();
    }

}
