package com.plantree.commonservice.domain.inform.domain;

import com.plantree.commonservice.global.entity.BaseTimeEntity;
import com.plantree.commonservice.global.util.SequentialUUIDGenerator;
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
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "inform")
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class Inform extends BaseTimeEntity {

    @Id
    @Column(name = "inform_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String title;

    @Column
    private String content;

    @Column(columnDefinition = "BINARY(16)")
    private UUID groupId;

    @OneToMany(mappedBy = "inform", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<InformFile> informFile = new ArrayList<>();

    @PrePersist
    public void generateInformId(){
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
