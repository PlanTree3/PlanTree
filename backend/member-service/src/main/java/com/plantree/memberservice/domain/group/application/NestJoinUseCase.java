package com.plantree.memberservice.domain.group.application;

import com.plantree.memberservice.domain.group.application.repository.NestRepository;
import com.plantree.memberservice.domain.group.domain.Nest;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NestJoinUseCase {

    private final MemberRepository memberRepository;
    private final NestRepository nestRepository;

    @Transactional
    public void requestJoin(UUID nestId, AuthMember authMember) {
        Member member = findMemberByIdOrThrow(authMember.getMemberId());
        switch (authMember.getRole()) {
            case STUDENT:
                studentJoin(nestId, member.getStudent());
                break;
            case PARENT:
                parentJoin(nestId, member.getParent());
                break;
        }
    }

    private void studentJoin(UUID nestId, Student student) {
        Nest nest = nestRepository.findByIdWithStudent(nestId)
                                  .orElseThrow(
                                          () -> new ResourceNotFoundException("둥지를 찾을 수 없습니다."));
        nest.joinStudent(student);
    }

    private void parentJoin(UUID nestId, Parent parent) {
        Nest nest = nestRepository.findByIdWithParent(nestId)
                                  .orElseThrow(
                                          () -> new ResourceNotFoundException("둥지를 찾을 수 없습니다."));
        nest.joinParent(parent);
    }

    private Member findMemberByIdOrThrow(UUID memberId) {
        return memberRepository.findById(memberId)
                               .orElseThrow(() -> new ResourceNotFoundException(
                                       "멤버를 찾을 수 없습니다."));
    }
}
