package com.plantree.memberservice.domain.auth.application;

import com.plantree.memberservice.domain.auth.application.jwt.JwtProvider;
import com.plantree.memberservice.domain.auth.application.oidc.IDTokenValidatorHandler;
import com.plantree.memberservice.domain.auth.application.oidc.OIDCMember;
import com.plantree.memberservice.domain.auth.dto.LoginResponseDto;
import com.plantree.memberservice.domain.auth.dto.request.LoginRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginUseCase {

    private final IDTokenValidatorHandler idTokenValidatorHandler;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final CookieHelper cookieHelper;

    public LoginResponseDto oauthLogin(LoginRequestDto loginRequestDto,
            HttpServletResponse httpServletResponse) {
        OIDCMember oidcMember = idTokenValidatorHandler.getOidcMemberByProviderAndIDToken(
                loginRequestDto.getOauthProvider(),
                loginRequestDto.getIdToken());

        Optional<Member> savedMember = memberRepository.findByOauthProviderAndOauthId(
                oidcMember.getOauthProvider(),
                oidcMember.getOauthId());

        if (savedMember.isEmpty()) {
            return new LoginResponseDto(true);
        }

        Member member = savedMember.get();
        String accessToken = jwtProvider.generateAccessToken(member);
        String refreshToken = jwtProvider.generateRefreshToken();
        member.setRefreshToken(refreshToken);

        cookieHelper.setTokenInCookie(httpServletResponse, accessToken, refreshToken);
        return new LoginResponseDto(false);
    }

}
