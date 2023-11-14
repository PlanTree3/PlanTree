package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.client.ForestServiceClient;
import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.group.dto.IsParentOfStudentResponseDto;
import com.plantree.memberservice.domain.group.dto.ParentIdsResponseDto;
import com.plantree.memberservice.domain.group.dto.ParentNestResponseDto;
import com.plantree.memberservice.domain.group.dto.StudentInfoListResponseDto;
import com.plantree.memberservice.domain.group.dto.StudentInfoResponseDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountListResponseDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountRequestDto;
import com.plantree.memberservice.domain.group.dto.client.BudCountResponseDto;
import com.plantree.memberservice.domain.group.dto.request.IsParentOfStudentRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Parent;
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
public class NestSearchUseCase {

    private final MemberRepository memberRepository;
    private final NestRepository nestRepository;
    private final ForestServiceClient forestServiceClient;

    @Transactional(readOnly = true)
    public StudentInfoListResponseDto searchNestStudents(UUID nestId, AuthMember authMember) {
        Nest nest = findNestWithStudentsById(nestId);
        nest.checkIsNestParentByMemberId(authMember.getMemberId());
        BudCountListResponseDto budCounts = forestServiceClient.getBudCounts(
                new BudCountRequestDto(nest));
        List<StudentInfoResponseDto> studentInfos = alignStudentInfosByStudentId(nest, budCounts);
        return new StudentInfoListResponseDto(studentInfos);
    }

    @Transactional(readOnly = true)
    public ParentNestResponseDto searchParentNest(AuthMember authMember) {
        Member member = findMemberWithNestStudentById(authMember.getMemberId());
        if (member.getParent()
                  .getNest() == null) {
            return new ParentNestResponseDto();
        }
        Nest nest = findNestWithParentById(member.getParent()
                                                 .getNest()
                                                 .getId());
        return new ParentNestResponseDto(nest);
    }

    @Transactional(readOnly = true)
    public ParentIdsResponseDto searchParentIds(UUID studentId) {
        Member member = findMemberWithNestParentById(studentId);
        return new ParentIdsResponseDto(member.getStudent()
                                              .getNest());
    }

    public IsParentOfStudentResponseDto getIsParentOfStudent(
            IsParentOfStudentRequestDto isParentOfStudentRequestDto) {
        Member member = findMemberWithNestParentById(isParentOfStudentRequestDto.getStudentId());
        return new IsParentOfStudentResponseDto(
                validateIsParentOfStudent(member, isParentOfStudentRequestDto.getParentId()));
    }

    private boolean validateIsParentOfStudent(Member member, UUID parentId) {
        return member.getStudent()
                     .getNest()
                     .getParents()
                     .stream()
                     .map(Parent::getMember)
                     .anyMatch(m -> m.getId()
                                     .equals(parentId));
    }

    private Member findMemberWithNestParentById(UUID studentId) {
        return memberRepository.findByIdWithNestParent(studentId)
                               .orElseThrow(() -> new ResourceNotFoundException("멤버를 찾을 수 없습니다."));
    }

    private Member findMemberWithNestStudentById(UUID parentId) {
        return memberRepository.findByIdWithNestStudent(parentId)
                               .orElseThrow(() -> new ResourceNotFoundException("멤버를 찾을 수 없습니다."));
    }

    private Nest findNestWithParentById(UUID nestId) {
        return nestRepository.findByIdWithParent(nestId)
                             .orElseThrow(() -> new ResourceNotFoundException("둥지를 찾을 수 없습니다."));
    }

    private Nest findNestWithStudentsById(UUID nestId) {
        return nestRepository.findByIdWithStudent(nestId)
                             .orElseThrow(() -> new ResourceNotFoundException("둥지를 찾을 수 없습니다."));
    }

    private List<StudentInfoResponseDto> alignStudentInfosByStudentId(Nest nest,
            BudCountListResponseDto budCounts) {
        return nest.getStudents()
                   .stream()
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
}
