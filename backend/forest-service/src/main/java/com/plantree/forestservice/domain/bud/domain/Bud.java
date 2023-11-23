package com.plantree.forestservice.domain.bud.domain;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.infra.database.converter.DayConverter;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import com.plantree.forestservice.global.util.SequentialUUIDGenerator;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
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
import org.hibernate.annotations.BatchSize;

@Entity
@Table(name = "bud")
@Getter
@NoArgsConstructor
public class Bud extends BaseTimeEntity {

    @Id
    @Column(name = "bud_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String name;

    @Column
    @Convert(converter = DayConverter.class)
    private Day day;

    @Column
    private boolean isComplete;

    @Column(columnDefinition = "BINARY(16)")
    private UUID studentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @BatchSize(size = 20)
    @OneToMany(mappedBy = "bud", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BudComment> budComments = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tree_id")
    private Tree tree;

    @Builder
    public Bud(String name, Day day, UUID studentId, Branch branch, UUID treeId) {
        this.name = name;
        this.day = day;
        this.studentId = studentId;
        this.branch = branch;
    }

    public void updateDay(Day day) {
        this.day = day;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void complete() {
        this.isComplete = true;
    }

    public void undoComplete() {
        this.isComplete = false;
    }

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
