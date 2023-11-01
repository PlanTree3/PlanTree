package com.plantree.forestservice.global.util;

import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.exception.UnauthorizedAccessException;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentReqDto;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberValidator {

    private final MemberServiceClient memberServiceClient;

    public void validateAuthMember(UUID studentId, AuthMember authMember){
//        switch (authMember.getRole()) {
//            case PARENT:
//                checkParentOfStudentFromTreeId(studentId, authMember);
//            case TEACHER:
//                checkTeacherOfStudentFromTreeId(studentId, authMember);
//            case STUDENT:
//                checkOwnerOfTreeId(studentId, authMember);
//        }
    }


    public void checkParentOfStudentFromTreeId(UUID studentId, AuthMember authMember) {
        CheckNestParentReqDto checkNestParentReqDto = new CheckNestParentReqDto(studentId,
                authMember.getMemberId());
        boolean isAuthMemberParentOfStudent =
                memberServiceClient.checkNestParent(checkNestParentReqDto).isParent();
        if (!isAuthMemberParentOfStudent) {
            throw new UnauthorizedAccessException();
        }
    }

    public void checkTeacherOfStudentFromTreeId(UUID studentId, AuthMember authMember) {
        CheckGroupLeaderReqDto checkGroupLeaderReqDto = new CheckGroupLeaderReqDto(studentId,
                authMember.getMemberId());
        boolean isAuthMemberTeacherOfStudent =
                memberServiceClient.checkGroupLeader(checkGroupLeaderReqDto).isLeader();
        if (!isAuthMemberTeacherOfStudent) {
            throw new UnauthorizedAccessException();
        }
    }

    public void checkOwnerOfTreeId(UUID studentId, AuthMember authMember) {
        boolean authMemberIsOwnerOfTree = studentId.equals(authMember.getMemberId());
        if (!authMemberIsOwnerOfTree) {
            throw new UnauthorizedAccessException();
        }
    }

}
