package com.plantree.memberservice.domain.member.application;

import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.dto.MemberInfoResponseDto;
import com.plantree.memberservice.domain.member.dto.MemberNameRequestDto;
import com.plantree.memberservice.domain.member.dto.MemberNameResponseDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberSearchUseCase {

    private final MemberRepository memberRepository;

    public MemberInfoResponseDto searchMemberInfo(AuthMember authMember) {
        Member member = memberRepository.findById(authMember.getMemberId())
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "멤버를 찾을 수 없습니다."));
        return new MemberInfoResponseDto(member);
    }

    public MemberNameResponseDto searchMemberNames(MemberNameRequestDto memberNameRequestDto) {
        List<Member> members = memberRepository.findByIdIn(memberNameRequestDto.getMemberIds());
        return new MemberNameResponseDto(members);
    }
}
