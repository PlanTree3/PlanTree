package com.plantree.memberservice.domain.auth.application.oidc;

import com.plantree.memberservice.domain.auth.application.jwt.JwtValidator;
import com.plantree.memberservice.domain.auth.dto.OIDCPublicKey;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import com.plantree.memberservice.global.exception.AuthenticationFailException;
import com.plantree.memberservice.global.property.KakaoOIDCProperty;
import feign.FeignException;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class KakaoIdTokenValidator extends IDTokenValidator {

    private final KakaoOauthClient kakaoOauthClient;
    private final String KAKAO_OAUTH_ID_KEY = "sub";
    private final String KAKAO_EMAIL_KEY = "email";


    public KakaoIdTokenValidator(JwtValidator jwtValidator, KakaoOIDCProperty kakaoOIDCProperty,
            KakaoOauthClient kakaoOauthClient) {
        super(jwtValidator, kakaoOIDCProperty.toOIDCProperty());
        this.kakaoOauthClient = kakaoOauthClient;
    }

    @Override
    List<OIDCPublicKey> getOIDCPublicKeys() {
        try {
            return kakaoOauthClient.getKakaoOIDCOpenKeys()
                                   .getKeys();
        } catch (FeignException e) {
            throw new AuthenticationFailException("공개키 목록을 가져오는데 실패했습니다.");
        }
    }

    @Override
    OIDCMember extractUserInfo(Map<String, Object> payload) {
        checkPayload(payload);
        String oAuthId = (String) payload.get(KAKAO_OAUTH_ID_KEY);
        String email = (String) payload.get(KAKAO_EMAIL_KEY);
        return OIDCMember.builder()
                         .oauthProvider(OauthProvider.KAKAO)
                         .oauthId(oAuthId)
                         .email(email)
                         .build();
    }

    private void checkPayload(Map<String, Object> payload) {
        if (payload.get(KAKAO_OAUTH_ID_KEY) == null) {
            throw new AuthenticationFailException("잘못된 토큰입니다.");
        }
    }
}
