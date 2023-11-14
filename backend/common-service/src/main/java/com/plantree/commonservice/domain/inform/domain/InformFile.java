package com.plantree.commonservice.domain.inform.domain;

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
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "inform_file")
@Getter
@NoArgsConstructor
@RequiredArgsConstructor
public class InformFile extends BaseTimeEntity {

    @Id
    @Column(name = "inform_file_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String file;

    @PrePersist
    public void generateInformId(){
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }


}
