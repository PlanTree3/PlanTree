package com.plantree.forestservice.domain.bud.domain;

import com.plantree.forestservice.global.entity.BaseTimeEntity;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bud_comment")
@Getter
@NoArgsConstructor
public class BudComment extends BaseTimeEntity {

    @Id
    @Column(name = "bud_comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private UUID writerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bud_id")
    private Bud bud;

    @Builder
    public BudComment(String content, UUID writerId, Bud bud) {
        this.content = content;
        this.writerId = writerId;
        this.bud = bud;
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
