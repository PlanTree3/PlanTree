package com.plantree.forestservice.global.event;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;

@Getter
@JsonInclude(Include.NON_NULL)
public abstract class Event {

    private String createdAt;
    private UUID treeId;

    public Event(UUID treeId) {
        this.createdAt = LocalDate.now()
                                  .toString();
        this.treeId = treeId;
    }
}
