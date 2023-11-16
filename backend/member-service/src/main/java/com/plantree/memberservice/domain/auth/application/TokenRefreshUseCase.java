package com.plantree.memberservice.domain.auth.application;

import com.plantree.memberservice.domain.auth.application.jwt.JwtProvider;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.global.exception.AuthenticationFailException;
import com.plantree.memberservice.global.exception.ResourceNotFoundException;
import java.util.UUID;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TokenRefreshUseCase {

    private final CookieHelper cookieHelper;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    @Transactional
    public void refresh(HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse) {
        String accessToken = extractAccessToken(httpServletRequest);
        String refreshToken = extractRefreshToken(httpServletRequest);

        UUID memberId = UUID.fromString(jwtProvider.getMemberIdFromExpiredAccessToken(accessToken));
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                "멤버를 찾을 수 없습니다."));

        validateRefreshToken(member, refreshToken);
        String newAccessToken = jwtProvider.generateAccessToken(member);
        cookieHelper.setAccessTokenInCookie(httpServletResponse, newAccessToken);
    }

    private void validateRefreshToken(Member member, String refreshToken) {
        jwtProvider.validateRefreshToken(refreshToken);
        member.checkEqualRefreshToken(refreshToken);
    }

    private String extractAccessToken(HttpServletRequest httpServletRequest) {
        Cookie accessTokenCookie = getCookieByName(httpServletRequest.getCookies(), "accessToken");
        if (accessTokenCookie == null) {
            throw new AuthenticationFailException("엑세스 토큰이 없습니다.");
        }
        return accessTokenCookie.getValue();
    }

    private String extractRefreshToken(HttpServletRequest httpServletRequest) {
        Cookie refreshTokenCookie = getCookieByName(httpServletRequest.getCookies(),
                "refreshToken");
        if (refreshTokenCookie == null) {
            throw new AuthenticationFailException("리프레쉬 토큰이 없습니다.");
        }
        return refreshTokenCookie.getValue();
    }

    private Cookie getCookieByName(Cookie[] cookies, String name) {
        for (Cookie cookie : cookies) {
            if (cookie.getName()
                      .equals(name)) {
                return cookie;
            }
        }
        return null;
    }
}
