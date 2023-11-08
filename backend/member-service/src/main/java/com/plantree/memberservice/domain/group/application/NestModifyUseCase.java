package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.dto.request.NestNameChangeRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NestModifyUseCase {

    private final NestRepository nestRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void changeName(UUID nestId, AuthMember authMember,
            NestNameChangeRequestDto nestNameChangeRequestDto) {
        Nest nest = nestRepository.findByIdWithParent(nestId)
                                  .orElseThrow(
                                          () -> new ResourceNotFoundException("둥지를 찾을 수 없습니다."));
        Parent parent = findParentByIdOrThrow(authMember);
        nest.changeNameByParent(nestNameChangeRequestDto.getNestName(), parent);
    }

    private Parent findParentByIdOrThrow(AuthMember authMember) {
        return memberRepository.findById(authMember.getMemberId())
                               .orElseThrow(() -> new ResourceNotFoundException(
                                       "멤버를 찾을 수 없습니다."))
                               .getParent();
    }
}
