package com.plantree.memberservice.domain.group.domain;


import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.global.entity.BaseTimeEntity;
import com.plantree.memberservice.global.exception.UnauthorizedException;
import com.plantree.memberservice.global.util.SequentialUUIDGenerator;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Nest extends BaseTimeEntity {

    @Id
    @Column(name = "nest_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String name;

    @OneToMany(mappedBy = "nest", cascade = CascadeType.PERSIST)
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "nest", cascade = CascadeType.PERSIST)
    private Set<Parent> parents = new HashSet<>();

    @Builder
    public Nest(String name, Parent parent) {
        this.name = name;
        this.parents.add(parent);
    }

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

    public void joinParent(Parent parent) {
        parent.checkAlreadyNesting();
        parent.setNest(this);
        this.parents.add(parent);
    }

    public void joinStudent(Student student) {
        student.checkAlreadyNesting();
        student.setNest(this);
        this.students.add(student);
    }


    private void checkIsNestParent(Parent parent) {
        if (this.parents.stream()
                        .noneMatch(p -> p.getId()
                                         .equals(parent.getId()))) {
            throw new UnauthorizedException("둥지 부모님이 아닙니다.");
        }
    }

    public void changeNameByParent(String name, Parent parent) {
        checkIsNestParent(parent);
        this.name = name;
    }

    public void checkIsNestParentByMemberId(UUID memberId) {
        if (this.parents.stream()
                        .noneMatch(parent -> parent.getMember()
                                                   .getId()
                                                   .equals(memberId))) {
            throw new UnauthorizedException("둥지 부모님이 아닙니다.");
        }
    }
}
