package com.plantree.commonservice.global.util;

import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.UnauthorizedAccessException;
import com.plantree.commonservice.global.openFeign.MemberServiceClient;
import com.plantree.commonservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.commonservice.global.openFeign.dto.CheckGroupLeaderResDto;
import com.plantree.commonservice.global.openFeign.dto.CheckNestParentReqDto;
import com.plantree.commonservice.global.openFeign.dto.CheckNestParentResDto;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthMemberValidator {

    private final MemberServiceClient memberServiceClient;

    public void isGroupLeader(UUID groupId, AuthMember authMember) {
        CheckGroupLeaderResDto checkGroupLeaderResDto = memberServiceClient.checkGroupLeader(
                new CheckGroupLeaderReqDto(authMember.getMemberId()), groupId);
        if (!checkGroupLeaderResDto.isTeacher()) {
            throw new UnauthorizedAccessException();
        }
    }

    public void isParentOfStudent(UUID studentId, AuthMember authMember) {
        CheckNestParentResDto checkNestParentResDto = memberServiceClient.checkNestParent(
                new CheckNestParentReqDto(studentId, authMember.getMemberId()));
        if(!checkNestParentResDto.isParent()){
            throw new UnauthorizedAccessException();
        }
    }


}
