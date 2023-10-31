package com.plantree.forestservice.domain.commons.controller;

import com.plantree.forestservice.domain.commons.application.CommonsSignupUseCase;
import com.plantree.forestservice.domain.commons.dto.CommonsSignupReqDto;
import com.plantree.forestservice.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("commons")
@RequiredArgsConstructor
public class FromMemberController {

    private final CommonsSignupUseCase commonsSignupUseCase;

    @PostMapping("/signup")
    public ResponseEntity<?> createForestAndTree(
            @RequestBody CommonsSignupReqDto request){
        commonsSignupUseCase.createForestAndTree(request.getStudentId());
        return HttpResponse.ok(HttpStatus.OK, "새 멤버의 숲과 나무가 생성되었습니다.");
    }


}
