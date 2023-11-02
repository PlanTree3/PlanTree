package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.domain.group.domain.GroupStudent;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.global.exception.AlreadyNestingException;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;

    @Column
    private String name;

    @Column
    private String profileImageUrl;

    @OneToMany(mappedBy = "student")
    private List<GroupStudent> studentGroups = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nest_id")
    private Nest nest;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_id")
    private Member member;

    public Student(Member member) {
        this.name = member.getName();
        this.profileImageUrl = member.getProfileImageUrl();
        this.member = member;
        this.member.setStudent(this);
    }

    public void addStudentGroup(GroupStudent studentGroup) {
        this.studentGroups.add(studentGroup);
    }

    public void checkAlreadyNesting() {
        if (this.nest != null) {
            throw new AlreadyNestingException();
        }
    }

    public void setNest(Nest nest) {
        this.nest = nest;
    }

    public void changeName(String name) {
        this.name = name;
    }

    public void changeProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
}
