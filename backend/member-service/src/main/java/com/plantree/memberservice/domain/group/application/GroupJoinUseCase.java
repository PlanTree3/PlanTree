package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.dto.GroupWaitingStudentInfoListResponseDto;
import com.plantree.memberservice.domain.group.dto.request.GroupJoinAcceptRequestDto;
import com.plantree.memberservice.domain.group.dto.request.GroupJoinRefuseRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupJoinUseCase {

    private final MemberRepository memberRepository;
    private final GroupRepository groupRepository;

    @Transactional
    public void requestJoin(UUID groupId, AuthMember authMember) {
        Student student = findMemberByIdOrThrow(authMember.getMemberId()).getStudent();
        Group group = findGroupByIdOrThrow(groupId);
        group.joinStudent(student);
    }

    @Transactional
    public void acceptJoin(UUID groupId, AuthMember authMember,
            GroupJoinAcceptRequestDto groupJoinAcceptRequestDto) {
        Teacher teacher = findMemberByIdOrThrow(authMember.getMemberId()).getTeacher();
        Student student = findMemberByIdOrThrow(
                groupJoinAcceptRequestDto.getMemberId()).getStudent();
        Group group = findGroupByIdOrThrow(groupId);
        group.acceptStudentByTeacher(student, teacher);
    }

    @Transactional
    public void refuseJoin(UUID groupId, AuthMember authMember,
            GroupJoinRefuseRequestDto groupJoinRefuseRequestDto) {
        Teacher teacher = findMemberByIdOrThrow(authMember.getMemberId()).getTeacher();
        Student student = findMemberByIdOrThrow(
                groupJoinRefuseRequestDto.getMemberId()).getStudent();
        Group group = findGroupByIdOrThrow(groupId);
        group.refuseStudentByTeacher(student, teacher);
    }

    @Transactional(readOnly = true)
    public GroupWaitingStudentInfoListResponseDto searchJoinRequestList(UUID groupId,
            AuthMember authMember) {
        Group group = findGroupWithTeacherAndStudentsByIdOrThrow(groupId);
        group.checkIsGroupTeacherByMemberId(authMember.getMemberId());
        return new GroupWaitingStudentInfoListResponseDto(group);
    }

    private Group findGroupWithTeacherAndStudentsByIdOrThrow(UUID groupId) {
        return groupRepository.findByIdWithTeacherAndStudents(groupId)
                              .orElseThrow(() -> new ResourceNotFoundException("그룹을 찾을 수 없습니다."));
    }

    private Member findMemberByIdOrThrow(UUID memberId) {
        return memberRepository.findById(memberId)
                               .orElseThrow(() -> new ResourceNotFoundException(
                                       "멤버를 찾을 수 없습니다."));
    }

    private Group findGroupByIdOrThrow(UUID groupId) {
        return groupRepository.findByIdWithGroupStudents(groupId)
                              .orElseThrow(() -> new ResourceNotFoundException("그룹을 찾을 수 없습니다."));
    }
}
