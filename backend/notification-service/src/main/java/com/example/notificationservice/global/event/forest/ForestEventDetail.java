package com.example.notificationservice.global.event.forest;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = BudCreatedEvent.class, name = "STU_GEN_BUD"),
        @JsonSubTypes.Type(value = BudCompletedEvent.class, name = "STU_COM_BUD"),
        @JsonSubTypes.Type(value = BranchCreatedByStudentEvent.class, name = "STU_GEN_BRA"),
        @JsonSubTypes.Type(value = BranchCreatedByTeacherEvent.class, name = "TEA_GEN_BRA"),
        @JsonSubTypes.Type(value = BranchCreatedByParentEvent.class, name = "PAR_GEN_BRA"),
        @JsonSubTypes.Type(value = BudCommentCreatedByStudentEvent.class, name = "STU_WRI_BUD"),
        @JsonSubTypes.Type(value = BudCommentCreatedByParentEvent.class, name = "PAR_WRI_BUD"),
        @JsonSubTypes.Type(value = BudCommentCreatedByTeacherEvent.class, name = "TEA_WRI_BUD"),
})
public abstract class ForestEventDetail {

}
