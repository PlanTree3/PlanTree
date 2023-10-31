package com.plantree.forestservice.domain.forest.domain;

import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "forest")
@Getter
@NoArgsConstructor
public class Forest extends BaseTimeEntity {

    @Id
    @Column(name = "forest_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(name = "student_id")
    private UUID studentId;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @OneToMany(mappedBy = "forest", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Tree> trees = new ArrayList<>();

}
