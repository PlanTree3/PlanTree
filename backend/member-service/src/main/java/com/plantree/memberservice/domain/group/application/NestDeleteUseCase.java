package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NestDeleteUseCase {

    private final NestRepository nestRepository;

    @Transactional
    public void deleteNest(UUID nestId, AuthMember authMember) {
        Nest nest = findNestWithParentAndStudentById(nestId);
        nest.checkIsNestParentByMemberId(authMember.getMemberId());
        nest.disconnectStudentsAndParents();
        nestRepository.delete(nest);
    }

    public Nest findNestWithParentAndStudentById(UUID nestId) {
        return nestRepository.findByIdWithStudentAndParent(nestId)
                             .orElseThrow(() -> new ResourceNotFoundException("둥지를 찾을 수 없습니다."));
    }
}
