package com.plantree.memberservice.domain.auth.application.oidc;

import com.plantree.memberservice.domain.member.domain.OauthProvider;
import com.plantree.memberservice.global.exception.AuthenticationFailException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class IDTokenValidatorHandler {

    private final KakaoIdTokenValidator kakaoIDTokenValidator;
    private final GoogleIdTokenValidator googleIdTokenValidator;

    public OIDCMember getOidcMemberByProviderAndIDToken(OauthProvider oauthProvider,
            String idToken) {
        switch (oauthProvider) {
            case KAKAO:
                return kakaoIDTokenValidator.getOIDCMemberByIDToken(idToken);
            case GOOGLE:
                return googleIdTokenValidator.getOIDCMemberByIDToken(idToken);
            default:
                throw new AuthenticationFailException("해당 Provider를 제공하지 않습니다.");
        }

    }
}
