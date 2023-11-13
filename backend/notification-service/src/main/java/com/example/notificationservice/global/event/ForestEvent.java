package com.example.notificationservice.global.event;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public abstract class ForestEvent {

    private long timestamp;
    private UUID treeId;

}
