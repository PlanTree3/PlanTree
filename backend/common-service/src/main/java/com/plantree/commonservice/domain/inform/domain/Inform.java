package com.plantree.commonservice.domain.inform.domain;

import com.plantree.commonservice.global.entity.BaseTimeEntity;
import com.plantree.commonservice.global.exception.UnauthorizedAccessException;
import com.plantree.commonservice.global.util.SequentialUUIDGenerator;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "inform")
@Getter
@NoArgsConstructor
public class Inform extends BaseTimeEntity {

    @Id
    @Column(name = "inform_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column
    private String title;

    @Column(columnDefinition = "VARCHAR(2000)")
    private String content;

    @Column(columnDefinition = "BINARY(16)")
    private UUID groupId;

    @Column(columnDefinition = "BINARY(16)")
    private UUID teacherId;

    @OneToMany(mappedBy = "inform", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<InformFile> informFiles = new ArrayList<>();

    @Builder
    public Inform(String title, String content, UUID groupId, UUID teacherId,
            List<InformFile> informFiles) {
        this.title = title;
        this.content = content;
        this.groupId = groupId;
        this.teacherId = teacherId;
        informFiles.forEach(informFile -> informFile.setInform(this));
        this.informFiles.addAll(informFiles);
    }

    public void validateTeacher(UUID memberId) {
        if (!this.teacherId.equals(memberId)) {
            throw new UnauthorizedAccessException();
        }
    }

    public void changeTitle(String title) {
        this.title = title;
    }

    public void changeContent(String content) {
        this.content = content;
    }

    public void addInformFile(InformFile informFile) {
        informFile.setInform(this);
        this.informFiles.add(informFile);
    }

    public void deleteInformFile(UUID fileId) {
        for (InformFile file : this.informFiles) {
            if (file.getId()
                    .equals(fileId)) {
                this.informFiles.remove(file);
                return;
            }
        }
    }

    @PrePersist
    public void generateInformId() {
        this.id = SequentialUUIDGenerator.generateSequentialUUID();
    }

}
