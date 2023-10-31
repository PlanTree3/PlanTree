package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.dto.request.GroupNameChangeRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupNameChangeUseCase {

    private final GroupRepository groupRepository;

    @Transactional
    public void changeName(UUID groupId, AuthMember authMember,
            GroupNameChangeRequestDto groupNameChangeRequestDto) {
        Group group = groupRepository.findByIdWithTeacher(groupId);
        group.checkIsGroupTeacher(authMember.getMemberId());
        group.changeName(groupNameChangeRequestDto.getGroupName());
    }
}
