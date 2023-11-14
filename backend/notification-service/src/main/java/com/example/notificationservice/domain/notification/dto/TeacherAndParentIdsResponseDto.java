package com.example.notificationservice.domain.notification.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class TeacherAndParentIdsResponseDto {
    private List<UUID> teacherIds;
    private List<UUID> parentIds;
}
