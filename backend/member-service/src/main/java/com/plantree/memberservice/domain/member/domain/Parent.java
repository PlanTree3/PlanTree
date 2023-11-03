package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.global.exception.AlreadyNestingException;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parent_id")
    private Long id;

    @Column
    private String name;

    @Column
    private String profileImageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nest_id")
    private Nest nest;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_id")
    private Member member;

    public Parent(Member member) {
        this.name = member.getName();
        this.profileImageUrl = member.getProfileImageUrl();
        this.member = member;
        this.member.setParent(this);
    }

    public Nest createNest(String name) {
        checkAlreadyNesting();
        Nest nest = Nest.builder()
                        .name(name)
                        .parent(this)
                        .build();
        this.nest = nest;
        return nest;
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

    public void leaveNest() {
        this.nest = null;
    }
}
