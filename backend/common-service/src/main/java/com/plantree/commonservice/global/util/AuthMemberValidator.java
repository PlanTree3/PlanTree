package com.plantree.commonservice.global.util;

import com.plantree.commonservice.global.exception.UnauthorizedAccessException;
import com.plantree.commonservice.global.openFeign.MemberServiceClient;
import com.plantree.commonservice.global.webmvc.AuthMember;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthMemberValidator {

    private final MemberServiceClient memberServiceClient;

}
