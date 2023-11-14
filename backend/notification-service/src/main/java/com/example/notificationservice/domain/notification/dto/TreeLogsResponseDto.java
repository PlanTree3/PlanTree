package com.example.notificationservice.domain.notification.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class TreeLogsResponseDto {

    private List<TreeLogResponseDto> logs;

    public TreeLogsResponseDto(List<TreeLogResponseDto> logs) {
        this.logs = logs;
    }
}
