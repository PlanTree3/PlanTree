package com.plantree.commonservice.domain.inform.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plantree.commonservice.domain.inform.domain.Inform;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;

@Getter
public class GroupInformResponseDto {

    private UUID informId;
    private String title;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    public GroupInformResponseDto(Inform inform) {
        this.informId = inform.getId();
        this.title = inform.getTitle();
        this.createdAt = inform.getCreatedAt()
                               .toLocalDate();
    }
}
