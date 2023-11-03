package com.plantree.forestservice.domain.bud.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

public enum Day {
    MON("MON"), TUE("TUE"), WED("WED"), THU("THU"), FRI("FRI"), SAT("SAT"), SUN("SUN");

    private final String day;

    Day(String day){
        this.day = day;
    }

    @JsonCreator
    public static Day from(String input){
        for(Day day : Day.values()){
            if(day.getDay().equals(input)){
                return day;
            }
        }
        return null;
    }

    @JsonValue
    public String getDay(){
        return day;
    }
}
