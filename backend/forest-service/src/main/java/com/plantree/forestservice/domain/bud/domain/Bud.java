package com.plantree.forestservice.domain.bud.domain;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.infra.database.converter.DayConverter;
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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private boolean is_complete;

    @Column
    private UUID studentId;

    @ManyToOne
    private Branch branch;

    @OneToMany(mappedBy = "bud", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BudComment> budComments = new ArrayList<>();

    @PrePersist
    public void generateMemberId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
