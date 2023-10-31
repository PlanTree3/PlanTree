package com.plantree.forestservice.domain.bud.domain;

import lombok.Getter;

@Getter
public enum Day {
    MON("mon"), TUE("tue"), WED("wed"), THU("thu"), FRI("fri"), SAT("sat"), SUN("sun");

    private String day;

    Day(String day){
        this.day = day;
    }
}
