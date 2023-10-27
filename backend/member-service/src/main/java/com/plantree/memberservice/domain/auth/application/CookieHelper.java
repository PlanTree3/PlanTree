package com.plantree.memberservice.domain.auth.application;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class CookieHelper {

    private static final int ACCESS_TOKEN_MAX_AGE = 60 * 30;
    private static final int REFRESH_TOKEN_MAX_AGE = 60 * 24 * 14;

    public void setTokenInCookie(HttpServletResponse httpServletResponse, String accessToken,
            String refreshToken) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
//        accessTokenCookie.setSecure(true);
        accessTokenCookie.setMaxAge(ACCESS_TOKEN_MAX_AGE);
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
//        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(REFRESH_TOKEN_MAX_AGE);
        httpServletResponse.addCookie(accessTokenCookie);
        httpServletResponse.addCookie(refreshTokenCookie);
    }
}
