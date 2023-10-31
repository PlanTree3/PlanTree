package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.dto.request.GroupNameChangeRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupModifyUseCase {

    private final GroupRepository groupRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void changeName(UUID groupId, AuthMember authMember,
            GroupNameChangeRequestDto groupNameChangeRequestDto) {
        Group group = groupRepository.findByIdWithTeacher(groupId);
        Teacher teacher = findTeacherByIdOrThrow(authMember);
        group.changeNameByTeacher(groupNameChangeRequestDto.getGroupName(), teacher);
    }

    private Teacher findTeacherByIdOrThrow(AuthMember authMember) {
        return memberRepository.findById(authMember.getMemberId())
                               .orElseThrow(() -> new ResourceNotFoundException(
                                       "멤버를 찾을 수 없습니다."))
                               .getTeacher();
    }
}
