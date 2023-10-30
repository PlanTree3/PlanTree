package com.plantree.memberservice.domain.group.domain;


import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.global.entity.BaseTimeEntity;
import com.plantree.memberservice.global.util.SequentialUUIDGenerator;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
@Table(name = "\"group\"")
public class Group extends BaseTimeEntity {

    @Id
    @Column(name = "group_id", columnDefinition = "BINARY(16)")
    private UUID id;

    private String name;

    @OneToMany(mappedBy = "group")
    private List<GroupStudent> groupStudents = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Builder
    public Group(String name, Teacher teacher) {
        this.name = name;
        this.teacher = teacher;
    }

    @PrePersist
    public void generateGroupId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }
}
