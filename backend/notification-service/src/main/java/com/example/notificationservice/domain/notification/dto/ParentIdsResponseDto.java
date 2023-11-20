package com.example.notificationservice.domain.notification.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ParentIdsResponseDto {

    private List<UUID> parentIds;
}
