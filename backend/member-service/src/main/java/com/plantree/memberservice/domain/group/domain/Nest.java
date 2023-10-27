package com.plantree.memberservice.domain.group.domain;


import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.global.entity.BaseTimeEntity;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Nest extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nest_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "nest")
    private List<Student> students = new ArrayList<>();

    @OneToMany(mappedBy = "nest")
    private List<Parent> parents = new ArrayList<>();
}
