package com.example.notificationservice.global.event.forest;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ForestEvent {

    private String createdAt;
    private UUID treeId;
    private ForestEventType type;

    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY, property = "type")
    private ForestEventDetail detail;

}