package com.plantree.commonservice.domain.inform.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InformUpdateRequestDto {

    private String title;
    private String content;
}
