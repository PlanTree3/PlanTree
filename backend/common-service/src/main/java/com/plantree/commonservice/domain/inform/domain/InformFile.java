package com.plantree.commonservice.domain.inform.domain;

import com.plantree.commonservice.global.entity.BaseTimeEntity;
import com.plantree.commonservice.global.util.SequentialUUIDGenerator;
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
@Table(name = "inform_file")
@Getter
@NoArgsConstructor
public class InformFile extends BaseTimeEntity {

    @Id
    @Column(name = "inform_file_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inform_id")
    private Inform inform;

    @Column
    private String fileName;

    @Column
    private String fileUrl;

    @Builder
    public InformFile(String fileName, String fileUrl) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
    }

    @PrePersist
    public void generateInformId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

    public void setInform(Inform inform) {
        this.inform = inform;
    }

}
