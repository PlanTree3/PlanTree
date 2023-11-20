package com.plantree.forestservice.domain.tree.domain;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.forest.domain.Forest;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import com.plantree.forestservice.global.util.SequentialUUIDGenerator;
import java.time.Clock;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
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

@Entity
@Table(name = "tree")
@Getter
@NoArgsConstructor
public class Tree extends BaseTimeEntity {

    @Id
    @Column(name = "tree_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "student_id", columnDefinition = "BINARY(16)")
    private UUID studentId;

    @Column
    private LocalDate startedAt = LocalDate.now(Clock.systemDefaultZone());

    @Column
    private LocalDate endedAt = LocalDate.now()
                                         .with(DayOfWeek.SUNDAY);

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "forest_id", columnDefinition = "BINARY(16)")
    private Forest forest;

    @OneToMany(mappedBy = "tree", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Branch> branches = new ArrayList<>();

    @Builder
    public Tree(UUID studentId, Forest forest) {
        this.studentId = studentId;
        this.forest = forest;
        this.name = calculateWeeks() + "번째 나무";
    }

    @Builder
    public Tree(UUID studentId, Forest forest, LocalDate startedAt, LocalDate endedAt) {
        this.studentId = studentId;
        this.forest = forest;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
    }

    public void updateForest(Forest forest) {
        this.forest = forest;
    }

    private int calculateWeeks() {
        LocalDate date = LocalDate.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        return date.get(weekFields.weekOfWeekBasedYear());
    }

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

    public void updateName(String name) {
        this.name = name;
    }
}
