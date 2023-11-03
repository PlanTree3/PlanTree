package com.plantree.memberservice.domain.group.dto.request;

import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupJoinAcceptRequestDto {

    private UUID memberId;
}
