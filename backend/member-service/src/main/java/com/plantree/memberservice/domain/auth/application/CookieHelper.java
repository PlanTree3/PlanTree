package com.plantree.memberservice.domain.auth.application;

import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieHelper {

    private static final int TOKEN_MAX_AGE = 60 * 60 * 24 * 14;
    private static final String ACCESS_TOKEN_NAME = "accessToken";
    private static final String REFRESH_TOKEN_NAME = "refreshToken";

    public void setAccessTokenInCookie(HttpServletResponse httpServletResponse,
            String accessToken) {
        ResponseCookie accessTokenCookie = ResponseCookie.from(ACCESS_TOKEN_NAME, accessToken)
                                                         .path("/")
//                                                         .sameSite("None")
//                                                         .httpOnly(true)
//                                                         .secure(true)
                                                         .maxAge(TOKEN_MAX_AGE)
                                                         .build();
        httpServletResponse.addHeader("Set-Cookie", accessTokenCookie.toString());
    }

    public void setRefreshTokenInCookie(HttpServletResponse httpServletResponse,
            String refreshToken) {
        ResponseCookie refreshTokenCookie = ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
                                                          .path("/")
//                                                          .sameSite("None")
//                                                          .httpOnly(true)
//                                                          .secure(true)
                                                          .maxAge(TOKEN_MAX_AGE)
                                                          .build();
        httpServletResponse.addHeader("Set-Cookie", refreshTokenCookie.toString());
    }
}
