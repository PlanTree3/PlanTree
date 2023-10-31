package com.plantree.memberservice.domain.auth.application.oidc;

import com.plantree.memberservice.domain.auth.application.jwt.JwtValidator;
import com.plantree.memberservice.domain.auth.dto.OIDCPublicKey;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import com.plantree.memberservice.global.exception.AuthenticationFailException;
import com.plantree.memberservice.global.exception.PublicKeyRetrievalException;
import com.plantree.memberservice.global.property.GoogleOIDCProperty;
import feign.FeignException;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class GoogleIdTokenValidator extends IDTokenValidator {

    private final GoogleOauthClient googleOauthClient;
    private final String GOOGLE_OAUTH_ID_KEY = "sub";
    private final String GOOGLE_EMAIL_KEY = "email";

    public GoogleIdTokenValidator(JwtValidator jwtValidator, GoogleOIDCProperty googleOIDCProperty,
            GoogleOauthClient googleOauthClient) {
        super(jwtValidator, googleOIDCProperty.toOIDCProperty());
        this.googleOauthClient = googleOauthClient;
    }

    @Override
    List<OIDCPublicKey> getOIDCPublicKeys() {
        try {
            return googleOauthClient.getGoogleOIDCOpenKeys()
                                    .getKeys();
        } catch (FeignException e) {
            throw new PublicKeyRetrievalException();
        }
    }

    @Override
    OIDCMember extractUserInfo(Map<String, Object> payload) {
        checkPayload(payload);
        String oAuthId = (String) payload.get(GOOGLE_OAUTH_ID_KEY);
        String email = (String) payload.get(GOOGLE_EMAIL_KEY);

        return OIDCMember.builder()
                         .oauthProvider(OauthProvider.KAKAO)
                         .oauthId(oAuthId)
                         .email(email)
                         .build();
    }
    
    private void checkPayload(Map<String, Object> payload) {
        if (payload.get(GOOGLE_OAUTH_ID_KEY) == null) {
            throw new AuthenticationFailException("잘못된 토큰입니다.");
        }
    }
}
