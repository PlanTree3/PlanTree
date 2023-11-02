package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.dto.NestCreateResponseDto;
import com.plantree.memberservice.domain.group.dto.request.NestCreateRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NestCreateUseCase {

    private final NestRepository nestRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public NestCreateResponseDto createNest(AuthMember authMember,
            NestCreateRequestDto nestCreateRequestDto) {
        Parent parent = memberRepository.findById(authMember.getMemberId())
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "멤버를 찾을 수 없습니다."))
                                        .getParent();
        parent.checkAlreadyNesting();
        Nest nest = parent.createNest(nestCreateRequestDto.getNestName());
        nestRepository.save(nest);
        return new NestCreateResponseDto(nest.getId());
    }
}
