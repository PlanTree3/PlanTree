package com.example.notificationservice.domain.notification.dto;

import com.example.notificationservice.domain.notification.domain.NotificationType;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(Include.NON_NULL)
public class TreeLogResponseDto {

    private NotificationType type;
    private String createdAt;
    private UUID treeId;
    private UUID studentId;
    private UUID parentId;
    private UUID teacherId;
    private UUID budId;
    private String budName;
    private UUID branchId;
    private String branchName;
    private String memberName;
}
