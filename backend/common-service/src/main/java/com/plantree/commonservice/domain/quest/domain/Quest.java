package com.plantree.commonservice.domain.quest.domain;

import com.plantree.commonservice.domain.quest.infra.database.converter.IssuerTypeConverter;
import com.plantree.commonservice.global.entity.BaseTimeEntity;
import com.plantree.commonservice.global.util.SequentialUUIDGenerator;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Builder;
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
    @Convert(converter = IssuerTypeConverter.class)
    private IssuerType issuerType;

    @Column
    private UUID issuer;

    @Column
    private UUID acceptor;

    @Column
    private String content;

    @Column
    private boolean isChecked;

    @Column
    private boolean isConfirmed;

    @Column
    private boolean isWaiting;

    @Column
    private boolean isFinished;

    @Builder
    public Quest(String title, IssuerType issuerType, UUID issuer, UUID acceptor, String content) {
        this.title = title;
        this.issuerType = issuerType;
        this.issuer = issuer;
        this.acceptor = acceptor;
        this.content = content;
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void check() {
        this.isChecked = true;
    }

    public void accept() {
        this.isConfirmed = true;
    }

    public void finishRequest() {
        this.isWaiting = true;
    }

    public void finish() {
        this.isFinished = true;
    }

    @PrePersist
    public void generateQuestId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
