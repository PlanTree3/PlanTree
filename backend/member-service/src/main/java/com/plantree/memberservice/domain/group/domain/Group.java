package com.plantree.memberservice.domain.group.domain;


import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.global.entity.BaseTimeEntity;
import com.plantree.memberservice.global.exception.AlreadyJoinedStudentException;
import com.plantree.memberservice.global.exception.AlreadyWaitingStudentException;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import com.plantree.memberservice.global.exception.UnauthorizedException;
import com.plantree.memberservice.global.util.SequentialUUIDGenerator;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
@Table(name = "\"group\"")
public class Group extends BaseTimeEntity {

    @Id
    @Column(name = "group_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String name;

    @OneToMany(mappedBy = "group", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<GroupStudent> groupStudents = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Builder
    public Group(String name, Teacher teacher) {
        this.name = name;
        this.teacher = teacher;
    }

    @PrePersist
    public void generateGroupId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

    public void changeNameByTeacher(String name, Teacher teacher) {
        checkIsGroupTeacher(teacher);
        this.name = name;
    }

    public void joinStudent(Student student) {
        checkAlreadyJoinedStudent(student);
        this.groupStudents.add(GroupStudent.createJoinRequest(student, this));
    }

    public void acceptStudentByTeacher(Student student, Teacher teacher) {
        checkIsGroupTeacher(teacher);
        GroupStudent groupStudent = findStudentInGroupOrThrow(student);
        if (groupStudent.getStudentState()
                        .equals(GroupStudentState.ACTIVE)) {
            throw new AlreadyJoinedStudentException();
        }
        groupStudent.approve();
    }

    public void refuseStudentByTeacher(Student student, Teacher teacher) {
        checkIsGroupTeacher(teacher);
        GroupStudent groupStudent = findStudentInGroupOrThrow(student);

        groupStudent.refuse();
    }

    private GroupStudent findStudentInGroupOrThrow(Student student) {
        return this.groupStudents.stream()
                                 .filter(gs -> gs.getStudent()
                                                 .getId()
                                                 .equals(student.getId()))
                                 .findAny()
                                 .orElseThrow(
                                         () -> new ResourceNotFoundException("신청 학생을 찾을 수 없습니다."));
    }

    private void checkAlreadyJoinedStudent(Student student) {
        if (groupStudents.stream()
                         .anyMatch(groupStudent -> groupStudent.getStudent()
                                                               .getId()
                                                               .equals(student.getId()))) {
            throw new AlreadyWaitingStudentException();
        }
    }

    private void checkIsGroupTeacher(Teacher teacher) {
        if (!this.teacher.getId()
                         .equals(teacher.getId())) {
            throw new UnauthorizedException("그룹 선생님이 아닙니다.");
        }
    }

    public void checkIsGroupTeacherByMemberId(UUID memberId) {
        if (!this.teacher.getMember()
                         .getId()
                         .equals(memberId)) {
            throw new UnauthorizedException("그룹 선생님이 아닙니다.");
        }
    }
}
