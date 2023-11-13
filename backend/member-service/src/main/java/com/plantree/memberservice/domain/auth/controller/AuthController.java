package com.plantree.memberservice.domain.auth.controller;

import com.plantree.memberservice.domain.auth.application.LoginUseCase;
import com.plantree.memberservice.domain.auth.application.LogoutUseCase;
import com.plantree.memberservice.domain.auth.application.SignUpUseCase;
import com.plantree.memberservice.domain.auth.application.TokenRefreshUseCase;
import com.plantree.memberservice.domain.auth.dto.request.LoginRequestDto;
import com.plantree.memberservice.domain.auth.dto.request.SignUpRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.config.webmvc.JwtLoginMember;
import com.plantree.memberservice.global.dto.HttpResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class AuthController {

    private final LoginUseCase loginUseCase;
    private final LogoutUseCase logoutUseCase;
    private final SignUpUseCase signUpUseCase;
    private final TokenRefreshUseCase tokenRefreshUseCase;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto,
            HttpServletResponse httpServletResponse) {
        return HttpResponse.okWithData(HttpStatus.OK, "로그인 성공",
                loginUseCase.oauthLogin(loginRequestDto, httpServletResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@JwtLoginMember AuthMember authMember,
            HttpServletResponse httpServletResponse) {
        logoutUseCase.logout(authMember, httpServletResponse);
        return HttpResponse.ok(HttpStatus.OK, "로그아웃 성공");
    }

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto signUpRequestDto,
            HttpServletResponse httpServletResponse) {
        return HttpResponse.okWithData(HttpStatus.OK, "회원가입 성공",
                signUpUseCase.signUp(signUpRequestDto, httpServletResponse));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse) {
        tokenRefreshUseCase.refresh(httpServletRequest, httpServletResponse);
        return HttpResponse.ok(HttpStatus.OK, "리프레쉬 성공");
    }
}
