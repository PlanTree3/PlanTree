package com.plantree.forestservice.domain.forest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plantree.forestservice.domain.forest.domain.Forest;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;

@Getter
public class ForestResDto {

    private UUID forestId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startedAt;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endedAt;

    public ForestResDto(Forest forest){
        this.forestId = forest.getId();
        this.startedAt = forest.getStartedAt();
        this.endedAt = forest.getEndedAt();
    }

}
