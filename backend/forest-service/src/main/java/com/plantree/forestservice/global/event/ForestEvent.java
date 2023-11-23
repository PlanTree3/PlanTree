package com.plantree.forestservice.global.event;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@JsonInclude(Include.NON_NULL)
public class ForestEvent {

    private String createdAt;
    private UUID treeId;
    private ForestEventType type;
    private ForestEventDetail detail;

    @Builder
    public ForestEvent(UUID treeId, ForestEventType type, ForestEventDetail detail) {
        this.createdAt = LocalDate.now()
                                  .toString();
        this.treeId = treeId;
        this.type = type;
        this.detail = detail;
    }
}
