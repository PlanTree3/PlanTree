package com.plantree.forestservice.domain.seed.domain;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import com.plantree.forestservice.global.util.SequentialUUIDGenerator;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seed")
@Getter
@NoArgsConstructor
public class Seed extends BaseTimeEntity {

    @Id
    @Column(name = "seed_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Builder
    public Seed(String name, Branch branch){
        this.name = name;
        this.branch = branch;
    }

    public void updateName(String name){
        this.name = name;
    }

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
