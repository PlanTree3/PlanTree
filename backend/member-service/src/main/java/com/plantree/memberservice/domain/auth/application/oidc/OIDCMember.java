package com.plantree.memberservice.domain.auth.application.oidc;

import com.plantree.memberservice.domain.member.domain.OauthProvider;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OIDCMember {

    private OauthProvider oauthProvider;
    private String oauthId;
    private String email;

    @Builder
    public OIDCMember(OauthProvider oauthProvider, String oauthId, String email) {
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.email = email;
    }
}
