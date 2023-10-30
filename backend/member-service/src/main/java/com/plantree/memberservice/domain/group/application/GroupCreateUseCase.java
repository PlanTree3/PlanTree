package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.dto.GroupCreateResponseDto;
import com.plantree.memberservice.domain.group.dto.request.GroupCreateRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupCreateUseCase {

    private final GroupRepository groupRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public GroupCreateResponseDto createGroup(AuthMember authMember,
            GroupCreateRequestDto groupCreateRequestDto) {
        Teacher teacher = memberRepository.findById(authMember.getMemberId())
                                          .orElseThrow(() -> new ResourceNotFoundException(
                                                  "멤버를 찾을 수 없습니다."))
                                          .getTeacher();
        Group group = teacher.createGroup(groupCreateRequestDto.getGroupName());
        groupRepository.save(group);
        return new GroupCreateResponseDto(group.getId());
    }
}
