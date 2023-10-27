package com.plantree.memberservice.domain.auth.application;

import com.plantree.memberservice.domain.auth.application.jwt.JwtProvider;
import com.plantree.memberservice.domain.auth.application.oidc.IDTokenValidatorHandler;
import com.plantree.memberservice.domain.auth.application.oidc.OIDCMember;
import com.plantree.memberservice.domain.auth.dto.SignUpResponseDto;
import com.plantree.memberservice.domain.auth.dto.request.SignUpRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.global.exception.AlreadyExistedMemberException;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignUpUseCase {

    private final IDTokenValidatorHandler idTokenValidatorHandler;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final CookieHelper cookieHelper;


    public SignUpResponseDto signUp(SignUpRequestDto signUpRequestDto,
            HttpServletResponse httpServletResponse) {
        OIDCMember oidcMember = idTokenValidatorHandler.getOidcMemberByProviderAndIDToken(
                signUpRequestDto.getOauthProvider(), signUpRequestDto.getIdToken());

        checkMemberExistsOrThrow(oidcMember);
        Member member = createMember(oidcMember, signUpRequestDto);
        member = memberRepository.save(member);

        String accessToken = jwtProvider.generateAccessToken(member);
        String refreshToken = jwtProvider.generateRefreshToken();
        member.setRefreshToken(refreshToken);

        cookieHelper.setTokenInCookie(httpServletResponse, accessToken, refreshToken);
        return new SignUpResponseDto(member.getId());
    }

    private Member createMember(OIDCMember oidcMember, SignUpRequestDto signUpRequestDto) {
        return Member.builder()
                     .oauthProvider(oidcMember.getOauthProvider())
                     .oauthId(oidcMember.getOauthId())
                     .name(signUpRequestDto.getName())
                     .profileImageUrl(signUpRequestDto.getProfileImageUrl())
                     .birthDate(signUpRequestDto.getBirthDate())
                     .email(oidcMember.getEmail())
                     .build();
    }

    private void checkMemberExistsOrThrow(OIDCMember oidcMember) {
        if (memberRepository.existsByOauthProviderAndOauthId(oidcMember.getOauthProvider(),
                oidcMember.getOauthId())) {
            throw new AlreadyExistedMemberException("이미 존재하는 회원입니다.");
        }
    }

}
