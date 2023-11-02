package com.plantree.memberservice.domain.member.application;

import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.dto.NameChangeRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NameChangeUseCase {

    private final MemberRepository memberRepository;

    public void changeName(AuthMember authMember, NameChangeRequestDto nameChangeRequestDto) {
        Member member = memberRepository.findById(authMember.getMemberId())
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "멤버를 찾을 수 없습니다."));
        member.changeName(nameChangeRequestDto.getName());
    }
}
