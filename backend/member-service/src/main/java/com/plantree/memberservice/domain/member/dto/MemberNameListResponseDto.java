package com.plantree.memberservice.domain.member.dto;

import com.plantree.memberservice.domain.member.domain.Member;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class MemberNameListResponseDto {

    private Map<UUID, String> names;

    public MemberNameListResponseDto(List<Member> members) {
        this.names = members.stream()
                            .collect(Collectors.toMap(Member::getId, Member::getName));
    }
}
