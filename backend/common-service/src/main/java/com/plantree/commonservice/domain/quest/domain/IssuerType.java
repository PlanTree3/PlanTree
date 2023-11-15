package com.plantree.commonservice.domain.quest.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum IssuerType {

    PARENT("PARENT"), TEACHER("TEACHER");

    private final String type;

    IssuerType(String type){
        this.type = type;
    }

    @JsonCreator
    public static IssuerType from(String input){
        for(IssuerType issuerType : IssuerType.values()){
            if(issuerType.getType().equals(input)){
                return issuerType;
            }
        }
        return null;
    }

    @JsonValue
    public String getType(){
        return type;
    }

}
