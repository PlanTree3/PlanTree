package com.plantree.memberservice.domain.group.controller;

import com.plantree.memberservice.domain.group.application.NestCreateUseCase;
import com.plantree.memberservice.domain.group.dto.request.NestCreateRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.config.webmvc.JwtLoginMember;
import com.plantree.memberservice.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/nest")
public class NestController {

    private final NestCreateUseCase nestCreateUseCase;

    @PostMapping
    public ResponseEntity<?> createNest(@JwtLoginMember AuthMember authMember,
            @RequestBody NestCreateRequestDto nestCreateRequestDto) {
        return HttpResponse.okWithData(HttpStatus.OK, "둥지 생성 성공",
                nestCreateUseCase.createNest(authMember, nestCreateRequestDto));
    }
}
