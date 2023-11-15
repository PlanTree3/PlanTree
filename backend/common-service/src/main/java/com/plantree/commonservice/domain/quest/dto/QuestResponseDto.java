package com.plantree.commonservice.domain.quest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plantree.commonservice.domain.quest.domain.IssuerType;
import com.plantree.commonservice.domain.quest.domain.Quest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class QuestResponseDto {

    private UUID questId;
    private String title;
    private String content;
    private IssuerType issuerType;
    private String issuerName;
    private String acceptorName;
    private boolean isChecked;
    private boolean isConfirmed;
    private boolean isFinished;
    private boolean isWaiting;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Builder
    public QuestResponseDto(Quest quest, String issuerName, String acceptorName){
        this.questId = quest.getId();
        this.title = quest.getTitle();
        this.content = quest.getContent();
        this.issuerType = quest.getIssuerType();
        this.issuerName = issuerName;
        this.acceptorName = acceptorName;
        this.isChecked = quest.isChecked();
        this.isConfirmed = quest.isConfirmed();
        this.isFinished = quest.isFinished();
        this.isWaiting = quest.isWaiting();
        this.createdAt = quest.getCreatedAt();
    }

}
