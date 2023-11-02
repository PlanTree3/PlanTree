package com.plantree.apigatewayservice.jwt;

import com.plantree.apigatewayservice.exception.AuthenticationFailException;
import com.plantree.apigatewayservice.exception.TokenExpiredException;
import com.plantree.apigatewayservice.property.JwtProperty;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;

@Component
public class JwtValidator {

    private final Key accessKey;


    public JwtValidator(JwtProperty jwtProperty) {
        byte[] accessEncodeByte = Base64Utils.encode(jwtProperty.getAccessKey()
                                                                .getBytes());
        this.accessKey = Keys.hmacShaKeyFor(accessEncodeByte);
    }

    public boolean validateAccessToken(String accessToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(accessKey)
                .build()
                .parseClaimsJws(accessToken);
            return true;
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException();
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new AuthenticationFailException("잘못된 서명입니다.");
        } catch (UnsupportedJwtException e) {
            throw new AuthenticationFailException("지원되지 않는 토큰입니다.");
        } catch (IllegalArgumentException e) {
            throw new AuthenticationFailException("잘못된 토큰입니다.");
        }
    }

    public Claims parseJwtToken(String accessToken) {
        return Jwts.parserBuilder()
                   .setSigningKey(accessKey)
                   .build()
                   .parseClaimsJws(accessToken)
                   .getBody();
    }

}
