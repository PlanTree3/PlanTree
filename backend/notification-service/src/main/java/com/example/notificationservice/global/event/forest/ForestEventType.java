package com.example.notificationservice.global.event.forest;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum ForestEventType {
    STU_GEN_BUD(Values.STU_GEN_BUD),
    STU_COM_BUD(Values.STU_COM_BUD),
    STU_GEN_BRA(Values.STU_GEN_BRA),
    PAR_GEN_BRA(Values.PAR_GEN_BRA),
    TEA_GEN_BRA(Values.TEA_GEN_BRA),
    STU_WRI_BUD(Values.STU_WRI_BUD),
    PAR_WRI_BUD(Values.PAR_WRI_BUD),
    TEA_WRI_BUD(Values.TEA_WRI_BUD);

    private final String type;

    ForestEventType(String type) {
        this.type = type;
    }

    @JsonValue
    public String getType() {
        return type;
    }
    
    public static class Values {

        public static final String STU_GEN_BUD = "STU_GEN_BUD";
        public static final String STU_COM_BUD = "STU_COM_BUD";
        public static final String STU_GEN_BRA = "STU_GEN_BRA";
        public static final String PAR_GEN_BRA = "PAR_GEN_BRA";
        public static final String TEA_GEN_BRA = "TEA_GEN_BRA";
        public static final String STU_WRI_BUD = "STU_WRI_BUD";
        public static final String PAR_WRI_BUD = "PAR_WRI_BUD";
        public static final String TEA_WRI_BUD = "TEA_WRI_BUD";
    }
}