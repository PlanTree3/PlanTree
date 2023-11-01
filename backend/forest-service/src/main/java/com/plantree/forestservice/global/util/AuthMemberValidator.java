package com.plantree.forestservice.global.util;

import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.UnauthorizedAccessException;
import com.plantree.forestservice.global.openFeign.MemberServiceClient;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckGroupLeaderResDto;
import com.plantree.forestservice.global.openFeign.dto.CheckTeacherReqDto;
import com.plantree.forestservice.global.openFeign.dto.CheckNestParentReqDto;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthMemberValidator {

    private final MemberServiceClient memberServiceClient;

    public void validateAuthMember(UUID studentId, AuthMember authMember) {
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
        CheckTeacherReqDto checkTeacherReqDto = new CheckTeacherReqDto(studentId,
                authMember.getMemberId());
        boolean isAuthMemberTeacherOfStudent =
                memberServiceClient.checkTeacher(checkTeacherReqDto).isLeader();
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

    public void isGroupLeader(Long groupId, AuthMember authMember) {
        CheckGroupLeaderResDto checkGroupLeaderResDto = memberServiceClient.checkGroupLeader(
                new CheckGroupLeaderReqDto(authMember.getMemberId(), groupId));
        if(!checkGroupLeaderResDto.isLeader()){
            throw new UnauthorizedAccessException();
        }
    }

}
