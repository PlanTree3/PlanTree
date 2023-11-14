package com.plantree.commonservice.global.event;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.util.UUID;
import lombok.Getter;

@Getter
@JsonInclude(Include.NON_NULL)
public abstract class Event {

    private long timestamp;
    private UUID treeId;

    public Event(UUID treeId) {
        this.timestamp = System.currentTimeMillis();
        this.treeId = treeId;
    }
}
