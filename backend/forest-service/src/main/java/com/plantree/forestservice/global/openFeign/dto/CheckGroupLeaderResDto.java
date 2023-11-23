package com.plantree.forestservice.global.openFeign.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckGroupLeaderResDto {

    private boolean teacher;

    public CheckGroupLeaderResDto(boolean teacher) {
        this.teacher = teacher;
    }

}
