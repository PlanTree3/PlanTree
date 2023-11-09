package com.plantree.memberservice.domain.member.dto;

import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Role;
import lombok.Getter;

@Getter
public class MemberInfoResponseDto {

    private Role role;
    private String name;
    private String profileImageUrl;

    public MemberInfoResponseDto(Member member) {
        this.role = member.getRole();
        this.name = member.getName();
        this.profileImageUrl = member.getProfileImageUrl();
    }
}
