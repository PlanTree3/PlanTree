package com.plantree.commonservice.domain.inform.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Getter;

@Getter
public class MyInformResponseDto {

    private UUID informId;
    private String title;
    private String groupName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    public MyInformResponseDto(UUID informId, String title, String groupName,
            LocalDateTime createdAt) {
        this.informId = informId;
        this.title = title;
        this.groupName = groupName;
        this.createdAt = createdAt.toLocalDate();
    }
}
