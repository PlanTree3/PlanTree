package com.plantree.memberservice.domain.auth.controller;

import com.plantree.memberservice.domain.auth.application.DevLoginUseCase;
import com.plantree.memberservice.global.dto.HttpResponse;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dev/auth/login")
@RequiredArgsConstructor
public class DevAuthController {

    private final DevLoginUseCase devLoginUseCase;

    @PostMapping
    public ResponseEntity<?> devLogin(@RequestParam String oauthId,
            HttpServletResponse httpServletResponse) {
        devLoginUseCase.devLogin(oauthId, httpServletResponse);
        return HttpResponse.ok(HttpStatus.OK, "로그인 성공");
    }
}
