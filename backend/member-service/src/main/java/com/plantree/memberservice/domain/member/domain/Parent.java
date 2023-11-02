package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.global.exception.ParentAlreadyNestingException;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nest_id")
    private Nest nest;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_id")
    private Member member;

    public Parent(Member member) {
        this.member = member;
        this.member.setParent(this);
    }

    public Nest createNest(String name) {
        Nest nest = Nest.builder()
                        .name(name)
                        .parent(this)
                        .build();
        this.nest = nest;
        return nest;
    }

    public void checkAlreadyNesting() {
        if (this.nest != null) {
            throw new ParentAlreadyNestingException();
        }
    }
}
