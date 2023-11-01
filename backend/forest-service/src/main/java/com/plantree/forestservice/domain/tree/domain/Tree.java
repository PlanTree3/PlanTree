package com.plantree.forestservice.domain.tree.domain;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import com.plantree.forestservice.global.util.SequentialUUIDGenerator;
import java.time.Clock;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tree")
@Getter
@NoArgsConstructor
public class Tree extends BaseTimeEntity {

    @Id
    @Column(name = "tree_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "student_id")
    private UUID studentId;

    @Column
    private LocalDate startedAt = LocalDate.now(Clock.systemDefaultZone());
    ;

    @Column
    private LocalDate endedAt = LocalDate.now().with(DayOfWeek.SUNDAY);
    ;

    @ManyToOne(fetch = FetchType.LAZY)
    private Forest forest;

    @OneToMany(mappedBy = "tree", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Branch> branches = new ArrayList<>();

    public Tree(UUID studentId, Forest forest){
        this.studentId = studentId;
        this.forest = forest;
    }

    public void updateForest(Forest forest) {
        this.forest = forest;
    }

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}