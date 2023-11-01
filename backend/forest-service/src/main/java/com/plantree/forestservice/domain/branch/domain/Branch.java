package com.plantree.forestservice.domain.branch.domain;

import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.seed.domain.Seed;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import com.plantree.forestservice.global.util.SequentialUUIDGenerator;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "branch")
@Getter
@NoArgsConstructor
public class Branch extends BaseTimeEntity {

    private static String[] colors = new String[] {"230044", "E32244", "4499FF"};

    @Id
    @Column(name = "branch_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String name;

    @Column
    private String color;

    @Column
    private UUID studentId;

    @Column
    private UUID issuerId;

    @ManyToOne
    private Tree tree;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Seed> seeds = new ArrayList<>();

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Bud> buds = new ArrayList<>();

    @Builder
    public Branch(String name, UUID studentId, UUID issuerId, Tree tree){
        this.name = name;
        this.studentId = studentId;
        this.issuerId = issuerId;
        this.tree = tree;
        this.color = makeRandomColor();
    }

    private String makeRandomColor() {
        Random random = new Random();
        return colors[random.nextInt(colors.length)];
    }

    public void updateName(String name){
        this.name = name;
    }

    @PrePersist
    public void generateBranchId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
