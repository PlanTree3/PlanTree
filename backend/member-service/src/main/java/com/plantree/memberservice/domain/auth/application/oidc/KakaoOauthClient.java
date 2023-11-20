package com.plantree.memberservice.domain.auth.application.oidc;

import com.plantree.memberservice.domain.auth.dto.OIDCPublicKeyList;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "KakaoOauthClient", url = "https://kauth.kakao.com")
public interface KakaoOauthClient {

    @Cacheable("kakaoPublicKeys")
    @GetMapping("/.well-known/jwks.json")
    OIDCPublicKeyList getKakaoOIDCOpenKeys();
}
