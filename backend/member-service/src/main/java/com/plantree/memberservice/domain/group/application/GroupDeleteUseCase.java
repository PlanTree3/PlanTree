package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupDeleteUseCase {

    private final GroupRepository groupRepository;

    @Transactional
    public void deleteGroup(UUID groupId, AuthMember authMember) {
        Group group = findGroupWithTeacherById(groupId);
        group.checkIsGroupTeacherByMemberId(authMember.getMemberId());
        groupRepository.delete(group);
    }

    private Group findGroupWithTeacherById(UUID groupId) {
        return groupRepository.findByIdWithTeacher(groupId)
                              .orElseThrow(() -> new ResourceNotFoundException("그룹을 찾을 수 없습니다."));
    }
}
