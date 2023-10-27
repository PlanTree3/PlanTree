package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.member.domain.Role.Values;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue(value = Values.PARENT)
@PrimaryKeyJoinColumn(name = "PARENT_ID")
public class Parent extends Member {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nest_id")
    private Nest nest;

}
