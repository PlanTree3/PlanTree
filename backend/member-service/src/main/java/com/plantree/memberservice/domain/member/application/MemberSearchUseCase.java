package com.plantree.memberservice.domain.member.application;

import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.application.repository.StudentRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.dto.MemberInfoResponseDto;
import com.plantree.memberservice.domain.member.dto.MemberNameListResponseDto;
import com.plantree.memberservice.domain.member.dto.MemberNameRequestDto;
import com.plantree.memberservice.domain.member.dto.MemberNameResponseDto;
import com.plantree.memberservice.domain.member.dto.StudentIdListResponseDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberSearchUseCase {

    private final MemberRepository memberRepository;
    private final StudentRepository studentRepository;

    @Transactional(readOnly = true)
    public MemberInfoResponseDto searchMemberInfo(AuthMember authMember) {
        Member member = memberRepository.findById(authMember.getMemberId())
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "멤버를 찾을 수 없습니다."));
        return new MemberInfoResponseDto(member);
    }

    @Transactional(readOnly = true)
    public MemberNameListResponseDto searchMemberNames(MemberNameRequestDto memberNameRequestDto) {
        List<Member> members = memberRepository.findByIdIn(memberNameRequestDto.getMemberIds());
        return new MemberNameListResponseDto(members);
    }

    @Transactional(readOnly = true)
    public MemberNameResponseDto searchMemberName(UUID memberId) {
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "멤버를 찾을 수 없습니다."));
        return new MemberNameResponseDto(member.getName());
    }

    @Transactional(readOnly = true)
    public StudentIdListResponseDto searchStudentIds() {
        return new StudentIdListResponseDto(studentRepository.findAll());
    }
}
