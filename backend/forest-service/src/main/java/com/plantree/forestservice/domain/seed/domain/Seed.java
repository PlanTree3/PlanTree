package com.plantree.forestservice.domain.seed.domain;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.global.entity.BaseTimeEntity;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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

    @ManyToOne
    private Branch branch;

}
