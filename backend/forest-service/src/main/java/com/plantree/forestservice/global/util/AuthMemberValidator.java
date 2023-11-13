package com.plantree.forestservice.global.util;

import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.exception.UnauthorizedAccessException;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherReqDto;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthMemberValidator {

    private final MemberServiceClient memberServiceClient;
    private final TreeRepository treeRepository;

    public void validateAuthMember(UUID studentId, AuthMember authMember) {
        switch (authMember.getRole()) {
            case PARENT:
                checkParentOfStudentFromTreeId(studentId, authMember);
                break;
            case TEACHER:
                checkTeacherOfStudentFromTreeId(studentId, authMember);
                break;
            case STUDENT:
                checkAuthMemberFromStudentIdOfTree(studentId, authMember);
                break;
        }
    }


    public void checkParentOfStudentFromTreeId(UUID studentId, AuthMember authMember) {
        CheckNestParentReqDto checkNestParentReqDto = new CheckNestParentReqDto(studentId,
                authMember.getMemberId());
        boolean isAuthMemberParentOfStudent =
                memberServiceClient.checkNestParent(checkNestParentReqDto)
                                   .isParent();
        if (!isAuthMemberParentOfStudent) {
            throw new UnauthorizedAccessException();
        }
    }

    public void checkTeacherOfStudentFromTreeId(UUID studentId, AuthMember authMember) {
        CheckTeacherReqDto checkTeacherReqDto = new CheckTeacherReqDto(studentId,
                authMember.getMemberId());
        boolean isAuthMemberTeacherOfStudent =
                memberServiceClient.checkTeacher(checkTeacherReqDto)
                                   .isLeader();
        if (!isAuthMemberTeacherOfStudent) {
            throw new UnauthorizedAccessException();
        }
    }

    public void checkAuthMemberFromStudentIdOfTree(UUID studentId, AuthMember authMember) {
        boolean authMemberIsOwnerOfTree = studentId.equals(authMember.getMemberId());
        if (!authMemberIsOwnerOfTree) {
            throw new UnauthorizedAccessException();
        }
    }

    public void checkAuthMemberFromTreeId(UUID treeId, AuthMember authMember) {
        Tree tree = treeRepository.findById(treeId)
                                  .orElseThrow(TreeNotFoundException::new);
        boolean authMemberIsOwnerOfTree = tree.getStudentId()
                                              .equals(authMember.getMemberId());
        if (!authMemberIsOwnerOfTree) {
            throw new UnauthorizedAccessException();
        }
    }

    public void isGroupLeader(UUID groupId, AuthMember authMember) {
        CheckGroupLeaderResDto checkGroupLeaderResDto = memberServiceClient.checkGroupLeader(
                new CheckGroupLeaderReqDto(authMember.getMemberId(), groupId));
        if (!checkGroupLeaderResDto.isLeader()) {
            throw new UnauthorizedAccessException();
        }
    }

}
