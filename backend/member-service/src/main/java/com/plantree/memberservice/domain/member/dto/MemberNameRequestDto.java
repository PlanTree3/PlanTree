package com.plantree.memberservice.domain.member.dto;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberNameRequestDto {

    private List<UUID> memberIds;
}
