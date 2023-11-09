package com.plantree.memberservice.domain.auth.application;

import com.plantree.memberservice.domain.auth.application.jwt.JwtProvider;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DevLoginUseCase {

    private final CookieHelper cookieHelper;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    @Transactional
    public void devLogin(String oauthId, HttpServletResponse httpServletResponse) {
        Member member = memberRepository.findByOauthProviderAndOauthId(
                                                OauthProvider.KAKAO,
                                                oauthId)
                                        .get();

        String accessToken = jwtProvider.generateAccessToken(member);
        String refreshToken = jwtProvider.generateRefreshToken();
        member.setRefreshToken(refreshToken);
        cookieHelper.setAccessTokenInCookie(httpServletResponse, accessToken);
        cookieHelper.setRefreshTokenInCookie(httpServletResponse, refreshToken);
    }
}
