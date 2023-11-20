package com.example.notificationservice.global.event.forest;

import com.example.notificationservice.global.event.forest.ForestEventType.Values;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonTypeInfo(use = Id.NAME, property = "type")
@JsonSubTypes({
        @Type(value = BudCreatedEvent.class, name = Values.STU_GEN_BUD),
        @Type(value = BudCompletedEvent.class, name = Values.STU_COM_BUD),
        @Type(value = BudCommentCreatedByStudentEvent.class, name = Values.STU_WRI_BUD),
        @Type(value = BudCommentCreatedByParentEvent.class, name = Values.PAR_WRI_BUD),
        @Type(value = BudCommentCreatedByTeacherEvent.class, name = Values.TEA_WRI_BUD),
        @Type(value = BranchCreatedByStudentEvent.class, name = Values.STU_GEN_BRA),
        @Type(value = BranchCreatedByParentEvent.class, name = Values.PAR_GEN_BRA),
        @Type(value = BranchCreatedByTeacherEvent.class, name = Values.TEA_GEN_BRA)
})
public abstract class ForestEvent {

    private String createdAt;
    private UUID treeId;

}
