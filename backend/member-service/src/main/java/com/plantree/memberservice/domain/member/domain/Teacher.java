package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.domain.group.domain.Group;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Long id;

    @OneToMany(mappedBy = "teacher")
    private List<Group> groups = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_id")
    private Member member;

    public Teacher(Member member) {
        this.member = member;
        this.member.setTeacher(this);
    }

    public Group createGroup(String name) {
        Group group = Group.builder()
                           .name(name)
                           .teacher(this)
                           .build();
        this.groups.add(group);
        return group;
    }
}
