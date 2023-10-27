package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.domain.group.domain.GroupStudent;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.member.domain.Role.Values;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue(value = Values.STUDENT)
@PrimaryKeyJoinColumn(name = "STUDENT_ID")
public class Student extends Member {

    @OneToMany(mappedBy = "student")
    private List<GroupStudent> studentGroups = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nest_id")
    private Nest nest;
}
