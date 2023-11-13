package com.plantree.forestservice.domain.forest.domain;

import com.plantree.forestservice.domain.tree.domain.Tree;
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
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "forest")
@Getter
@NoArgsConstructor
public class Forest extends BaseTimeEntity {

    @Id
    @Column(name = "forest_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "student_id", columnDefinition = "BINARY(16)")
    private UUID studentId;

    @Column(name = "started_at")
    private LocalDate startedAt = LocalDate.now(Clock.systemDefaultZone());

    @Column(name = "ended_at")
    private LocalDate endedAt;

    @OneToMany(mappedBy = "forest", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Tree> trees = new ArrayList<>();

    public Forest(UUID studentId) {
        this.studentId = studentId;
        this.endedAt = calculateEndDate(LocalDate.now());
    }

    public Forest(UUID studentId, LocalDate endedAt) {
        this.studentId = studentId;
        this.endedAt = endedAt;
    }

    public static LocalDate calculateEndDate(LocalDate localDate) {
        LocalDate endDate = localDate;
        if (endDate.isAfter(LocalDate.now()
                                     .withMonth(3)
                                     .withDayOfMonth(1)
                                     .with(DayOfWeek.SUNDAY))) {
            endDate = endDate.withYear(endDate.getYear() + 1);
        }
        return endDate.withMonth(3)
                      .withDayOfMonth(1)
                      .with(DayOfWeek.SUNDAY);
    }

    @PrePersist
    public void generateForestId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
