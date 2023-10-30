package com.plantree.memberservice.domain.member.controller;

import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.config.webmvc.JwtLoginMember;
import com.plantree.memberservice.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    @GetMapping("/health-check")
    public ResponseEntity<?> healthCheck(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.ok(HttpStatus.OK, "멤버서비스");
    }
}
