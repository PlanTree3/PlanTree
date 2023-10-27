package com.plantree.memberservice.domain.member.domain;

import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.member.domain.Role.Values;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue(value = Values.TEACHER)
@PrimaryKeyJoinColumn(name = "TEACHER_ID")
public class Teacher extends Member {

    @OneToMany(mappedBy = "teacher")
    private List<Group> groups = new ArrayList<>();
}
