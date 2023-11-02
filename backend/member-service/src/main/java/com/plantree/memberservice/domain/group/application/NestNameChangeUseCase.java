package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.dto.request.NestNameChangeRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NestNameChangeUseCase {

    private final NestRepository nestRepository;

    @Transactional
    public void changeName(UUID nestId, AuthMember authMember,
            NestNameChangeRequestDto nestNameChangeRequestDto) {
        Nest nest = nestRepository.findByIdWithParent(nestId);
        nest.checkIsNestParent(authMember.getMemberId());
        nest.changeName(nestNameChangeRequestDto.getNestName());
    }
}
