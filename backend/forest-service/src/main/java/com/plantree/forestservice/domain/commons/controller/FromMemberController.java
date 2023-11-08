package com.plantree.forestservice.domain.commons.controller;

import com.plantree.forestservice.domain.commons.application.CommonBudCountUseCase;
import com.plantree.forestservice.domain.commons.application.CommonsSignupUseCase;
import com.plantree.forestservice.domain.commons.dto.BudCountRequestDto;
import com.plantree.forestservice.domain.commons.dto.CommonsSignupReqDto;
import com.plantree.forestservice.global.responseType.HttpResponse;
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
    private final CommonBudCountUseCase commonBudCountUseCase;

    @PostMapping("/signup")
    public ResponseEntity<?> createForestAndTree(
            @RequestBody CommonsSignupReqDto request){
        commonsSignupUseCase.createForestAndTree(request.getStudentId());
        return HttpResponse.ok(HttpStatus.OK, "새 멤버의 숲과 나무가 생성되었습니다.");
    }

    @GetMapping("/progress")
    public ResponseEntity<?> getBudProgressByStudnetIds(
            @RequestBody BudCountRequestDto request){
        return HttpResponse.okWithData(HttpStatus.OK, "멤버들의 진행도입니다.",
                commonBudCountUseCase.findBudCountByStudentIds(request.getStudentIds()));
    }

}
