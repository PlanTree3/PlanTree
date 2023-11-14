package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.client.ForestServiceClient;
import com.plantree.memberservice.domain.group.application.repository.GroupRepository;
import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Group;
import com.plantree.memberservice.domain.group.domain.GroupStudent;
import com.plantree.memberservice.domain.group.domain.GroupStudentState;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.dto.GroupDetailResponseDto;
import com.plantree.memberservice.domain.group.dto.GroupNestSearchResponseDto;
import com.plantree.memberservice.domain.group.dto.GroupStudentIdsResponseDto;
import com.plantree.memberservice.domain.group.dto.IsTeacherOfGroupResponseDto;
import com.plantree.memberservice.domain.group.dto.IsTeacherOfStudentResponseDto;
import com.plantree.memberservice.domain.group.dto.StudentInfoListResponseDto;
import com.plantree.memberservice.domain.group.dto.StudentInfoResponseDto;
import com.plantree.memberservice.domain.group.dto.TeacherAndParentIdsResponseDto;
import com.plantree.memberservice.domain.group.dto.TeacherGroupListResponseDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountListResponseDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountRequestDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountResponseDto;
import com.plantree.memberservice.domain.group.dto.request.IsTeacherOfGroupRequestDto;
import com.plantree.memberservice.domain.group.dto.request.IsTeacherOfStudentRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupSearchUseCase {

    private final GroupRepository groupRepository;
    private final NestRepository nestRepository;
    private final MemberRepository memberRepository;
    private final ForestServiceClient forestServiceClient;


    @Transactional(readOnly = true)
    public GroupNestSearchResponseDto searchGroupAndNest(AuthMember authMember) {
        Student student = findStudentByIdOrThrow(authMember);
        Nest nest = student.getNest() == null ? null : findNestByIdOrThrow(student.getNest()
                                                                                  .getId());
        return new GroupNestSearchResponseDto(nest, student.getStudentGroups());
    }

    @Transactional(readOnly = true)
    public TeacherAndParentIdsResponseDto searchTeachersAndParentsId(UUID studentId) {
        Student student = findStudentByIdOrThrow(studentId);
        Nest nest = student.getNest() == null ? null : findNestByIdOrThrow(student.getNest()
                                                                                  .getId());
        TeacherAndParentIdsResponseDto dto = new TeacherAndParentIdsResponseDto(nest,
                student.getStudentGroups());
        System.out.println(dto.getParentIds());
        System.out.println(dto.getTeacherIds());
        return dto;
    }

    @Transactional(readOnly = true)
    public GroupDetailResponseDto searchGroupDetail(UUID groupId, AuthMember authMember) {
        Group group = findGroupWithTeacherAndStudentsByIdOrThrow(groupId);
        BudCountListResponseDto budCounts = forestServiceClient.getBudCounts(
                new BudCountRequestDto(group));
        List<StudentInfoResponseDto> studentInfos = alignStudentInfosByStudentId(group, budCounts);
        return new GroupDetailResponseDto(group, studentInfos);
    }

    @Transactional(readOnly = true)
    public TeacherGroupListResponseDto searchTeacherGroups(AuthMember authMember) {
        List<Group> teacherGroups = groupRepository.findTeacherGroupsByMemberId(
                authMember.getMemberId());
        return new TeacherGroupListResponseDto(teacherGroups);
    }

    @Transactional(readOnly = true)
    public StudentInfoListResponseDto searchGroupStudents(UUID groupId, AuthMember authMember) {
        Group group = findGroupWithTeacherAndStudentsByIdOrThrow(groupId);
        group.checkIsGroupTeacherByMemberId(authMember.getMemberId());
        BudCountListResponseDto budCounts = forestServiceClient.getBudCounts(
                new BudCountRequestDto(group));
        List<StudentInfoResponseDto> studentInfos = alignStudentInfosByStudentId(group, budCounts);
        return new StudentInfoListResponseDto(studentInfos);
    }

    @Transactional(readOnly = true)
    public GroupStudentIdsResponseDto searchStudentIds(UUID groupId) {
        Group group = findGroupWithStudentsByIdOrThrow(groupId);
        return new GroupStudentIdsResponseDto(group);
    }

    @Transactional(readOnly = true)
    public IsTeacherOfStudentResponseDto getIsTeacherOfStudent(
            IsTeacherOfStudentRequestDto isTeacherOfStudentRequestDto) {
        Member member = findMemberByIdWithGroupTeacher(isTeacherOfStudentRequestDto.getStudentId());
        return new IsTeacherOfStudentResponseDto(
                validateIsTeacherOfStudent(member, isTeacherOfStudentRequestDto.getTeacherId()));
    }

    @Transactional(readOnly = true)
    public IsTeacherOfGroupResponseDto getIsTeacherOfGroup(UUID groupId,
            IsTeacherOfGroupRequestDto isTeacherOfGroupRequestDto) {
        Group group = findGroupWithTeacherByIdOrThrow(groupId);
        return new IsTeacherOfGroupResponseDto(
                group.getIsGroupTeacherByMemberId(isTeacherOfGroupRequestDto.getTeacherId()));
    }

    private boolean validateIsTeacherOfStudent(Member member, UUID teacherId) {
        return member.getStudent()
                     .getStudentGroups()
                     .stream()
                     .map(GroupStudent::getGroup)
                     .map(Group::getTeacher)
                     .map(Teacher::getMember)
                     .anyMatch(m -> m.getId()
                                     .equals(teacherId));
    }

    private List<StudentInfoResponseDto> alignStudentInfosByStudentId(Group group,
            BudCountListResponseDto budCounts) {
        return group.getGroupStudents()
                    .stream()
                    .filter(groupStudent -> groupStudent.getStudentState()
                                                        .equals(GroupStudentState.ACTIVE))
                    .map(GroupStudent::getStudent)
                    .map(student -> {
                        BudCountResponseDto budCount = budCounts.getBudCounts()
                                                                .stream()
                                                                .filter(bc -> bc.getStudentId()
                                                                                .equals(student.getMember()
                                                                                               .getId()))
                                                                .findAny()
                                                                .orElse(new BudCountResponseDto());
                        return new StudentInfoResponseDto(student, budCount);
                    })
                    .collect(Collectors.toList());
    }

    private Group findGroupWithTeacherByIdOrThrow(UUID groupId) {
        return groupRepository.findByIdWithTeacher(groupId)
                              .orElseThrow(() -> new ResourceNotFoundException("그룹을 찾을 수 없습니다."));
    }

    private Group findGroupWithStudentsByIdOrThrow(UUID groupId) {
        return groupRepository.findByIdWithStudents(groupId)
                              .orElseThrow(() -> new ResourceNotFoundException("그룹을 찾을 수 없습니다."));
    }

    private Group findGroupWithTeacherAndStudentsByIdOrThrow(UUID groupId) {
        return groupRepository.findByIdWithTeacherAndStudents(groupId)
                              .orElseThrow(() -> new ResourceNotFoundException("그룹을 찾을 수 없습니다."));
    }

    private Student findStudentByIdOrThrow(AuthMember authMember) {
        return memberRepository.findByIdWithGroup(authMember.getMemberId())
                               .orElseThrow(() -> new ResourceNotFoundException(
                                       "멤버를 찾을 수 없습니다."))
                               .getStudent();
    }

    private Student findStudentByIdOrThrow(UUID studentId) {
        return memberRepository.findByIdWithGroup(studentId)
                               .orElseThrow(() -> new ResourceNotFoundException(
                                       "멤버를 찾을 수 없습니다."))
                               .getStudent();
    }

    private Nest findNestByIdOrThrow(UUID nestId) {
        return nestRepository.findByIdWithStudentAndParent(nestId)
                             .orElseThrow(() -> new ResourceNotFoundException("둥지를 찾을 수 없습니다."));
    }

    private Member findMemberByIdWithGroupTeacher(UUID studentId) {
        return memberRepository.findByIdWithGroupTeacher(studentId)
                               .orElseThrow(() -> new ResourceNotFoundException("멤버를 찾을 수 없습니다."));
    }

}
