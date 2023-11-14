package com.example.notificationservice.global.event.forest;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BudCommentCreatedByParentEvent extends ForestEvent {

    private ForestEventType type = ForestEventType.PAR_WRI_BUD;
    private UUID parentId;
    private UUID studentId;
    private UUID budId;
    private String budName;

}
