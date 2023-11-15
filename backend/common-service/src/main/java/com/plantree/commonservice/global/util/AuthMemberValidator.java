package com.plantree.commonservice.global.util;

import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.exception.UnauthorizedAccessException;
import com.plantree.commonservice.global.openFeign.MemberServiceClient;
import com.plantree.commonservice.global.openFeign.dto.CheckGroupLeaderReqDto;
import com.plantree.commonservice.global.openFeign.dto.CheckGroupLeaderResDto;
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
}
