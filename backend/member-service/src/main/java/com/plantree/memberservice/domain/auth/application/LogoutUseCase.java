package com.plantree.memberservice.domain.auth.application;

import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LogoutUseCase {

    private final MemberRepository memberRepository;
    private final CookieHelper cookieHelper;

    @Transactional
    public void logout(AuthMember authMember, HttpServletResponse httpServletResponse) {
        Member member = memberRepository.findById(authMember.getMemberId())
                                        .orElseThrow(() ->
                                                new ResourceNotFoundException("멤버를 찾을 수 없습니다."));

        member.setRefreshToken(null);
        cookieHelper.expireAccessToken(httpServletResponse);
        cookieHelper.expireRefreshToken(httpServletResponse);
    }
}
