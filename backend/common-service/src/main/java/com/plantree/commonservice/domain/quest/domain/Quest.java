package com.plantree.commonservice.domain.quest.domain;

import com.plantree.commonservice.global.entity.BaseTimeEntity;
import com.plantree.commonservice.global.util.SequentialUUIDGenerator;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quest")
@Getter
@NoArgsConstructor
public class Quest extends BaseTimeEntity {

    @Id
    @Column(name = "quest_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String title;

    @Column
    private UUID issuer;

    @Column
    private UUID acceptor;

    @Column
    private String content;

    @PrePersist
    public void generateQuestId(){
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
