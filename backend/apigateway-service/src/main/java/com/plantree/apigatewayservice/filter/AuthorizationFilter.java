package com.plantree.apigatewayservice.filter;

import com.plantree.apigatewayservice.exception.AuthenticationFailException;
import com.plantree.apigatewayservice.jwt.JwtValidator;
import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthorizationFilter extends AbstractGatewayFilterFactory<AuthorizationFilter.Config> {

    private final JwtValidator jwtValidator;
    private final static String ACCESS_TOKEN = "accessToken";
    private final static String REFRESH_TOKEN = "refreshToken";

    public AuthorizationFilter(JwtValidator jwtValidator) {
        super(Config.class);
        this.jwtValidator = jwtValidator;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest originRequest = exchange.getRequest();
            String requestUri = originRequest.getURI()
                                             .getPath();
            String httpMethod = originRequest.getMethodValue();

            if (isCookieNotRequired(requestUri, httpMethod)) {
                return chain.filter(exchange);
            }

            HttpCookie accessTokenCookie = getCookieByName(originRequest, ACCESS_TOKEN);
            HttpCookie refreshTokenCookie = getCookieByName(originRequest, REFRESH_TOKEN);
            if (accessTokenCookie == null || refreshTokenCookie == null) {
                throw new AuthenticationFailException("쿠키가 없습니다.");
            }
            if (requestUri.equals("/member/refresh") && httpMethod.equals("POST")) {
                return chain.filter(exchange);
            }

            String accessToken = accessTokenCookie.getValue();
            jwtValidator.validateAccessToken(accessToken);

            Claims claims = jwtValidator.parseJwtToken(accessToken);
            String role = (String) claims.get("role");
            String memberId = claims.getSubject();

            veryfyAuthority(role, requestUri, httpMethod);
            ServerHttpRequest modifiedRequest = mutateRequestAndSetHeaders(originRequest, memberId,
                    role);
            return chain.filter(exchange.mutate()
                                        .request(modifiedRequest)
                                        .build());
        };
    }

    private ServerHttpRequest mutateRequestAndSetHeaders(ServerHttpRequest originRequest,
            String memberId, String role) {
        return originRequest.mutate()
                            .headers(httpHeaders -> {
                                httpHeaders.add("authMember", memberId);
                                httpHeaders.add("role", role);
                            })
                            .build();
    }

    private void veryfyAuthority(String role, String requestUri, String method) {
        // TODO : role에 따른 권한 검증
        // 권한에 맞지 않으면
        // throw new UnauthorizedException();
    }

    private boolean isCookieNotRequired(String requestUri, String httpMethod) {
        return httpMethod.equals("POST") && (requestUri.equals("/member")
                || requestUri.equals("/member/login") || requestUri.equals(
                "/dev/auth/login"));
    }

    private HttpCookie getCookieByName(ServerHttpRequest request, String name) {
        if (request.getCookies()
                   .containsKey(ACCESS_TOKEN)) {
            return request.getCookies()
                          .get(name)
                          .get(0);
        }
        return null;
    }

    public static class Config {

    }
}
