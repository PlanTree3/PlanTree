package com.example.notificationservice.global.event.forest;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudCreatedEvent extends ForestEvent {

    private ForestEventType type = ForestEventType.STU_GEN_BUD;
    private UUID studentId;
    private UUID budId;
    private String budName;

}
