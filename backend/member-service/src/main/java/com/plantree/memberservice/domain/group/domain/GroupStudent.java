package com.plantree.memberservice.domain.group.domain;

import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.global.entity.BaseTimeEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class GroupStudent extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_student_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private GroupStudentState studentState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @Builder
    public GroupStudent(GroupStudentState studentState, Student student, Group group) {
        this.studentState = studentState;
        this.student = student;
        this.group = group;
        this.student.addStudentGroup(this);
    }

    public static GroupStudent createJoinRequest(Student student, Group group) {
        return GroupStudent.builder()
                           .studentState(GroupStudentState.WAITING)
                           .student(student)
                           .group(group)
                           .build();
    }

    public void approve() {
        this.studentState = GroupStudentState.ACTIVE;
    }

    public void refuse() {
        this.group.getGroupStudents()
                  .remove(this);
        this.group = null;
    }
}
