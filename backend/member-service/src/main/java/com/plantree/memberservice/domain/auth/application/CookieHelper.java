package com.plantree.memberservice.domain.auth.application;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class CookieHelper {

    private static final int TOKEN_MAX_AGE = 60 * 60 * 24 * 14;

    public void setAccessTokenInCookie(HttpServletResponse httpServletResponse,
            String accessToken) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setMaxAge(TOKEN_MAX_AGE);
        httpServletResponse.addCookie(accessTokenCookie);
    }

    public void setRefreshTokenInCookie(HttpServletResponse httpServletResponse,
            String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(TOKEN_MAX_AGE);
        httpServletResponse.addCookie(refreshTokenCookie);
    }
}
