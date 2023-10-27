package com.plantree.memberservice.domain.auth.controller;

import com.plantree.memberservice.domain.auth.application.LoginUseCase;
import com.plantree.memberservice.domain.auth.application.SignUpUseCase;
import com.plantree.memberservice.domain.auth.dto.request.LoginRequestDto;
import com.plantree.memberservice.domain.auth.dto.request.SignUpRequestDto;
import com.plantree.memberservice.global.dto.HttpResponse;
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
    private final SignUpUseCase signUpUseCase;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto,
            HttpServletResponse httpServletResponse) {
        return HttpResponse.okWithData(HttpStatus.OK, "로그인 성공",
                loginUseCase.oauthLogin(loginRequestDto, httpServletResponse));
    }

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto signUpRequestDto,
            HttpServletResponse httpServletResponse) {
        return HttpResponse.okWithData(HttpStatus.OK, "회원가입 성공",
                signUpUseCase.signUp(signUpRequestDto, httpServletResponse));
    }
}
