package com.plantree.forestservice.domain.bud.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plantree.forestservice.domain.bud.domain.BudComment;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BudCommentResDto {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifiedAt;
    private UUID issuerId;
    private String name;
    private String role;
    private String content;

    @Builder
    public BudCommentResDto(BudComment budComment, String name, String role){
        this.id = budComment.getId();
        this.createdAt = budComment.getCreatedAt();
        this.modifiedAt = budComment.getModifiedAt();
        this.issuerId = budComment.getWriterId();
        this.name = name;
        this.role = role;
        this.content = budComment.getContent();
    }

}
