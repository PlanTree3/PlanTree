package com.plantree.forestservice.domain.commons.controller;

import com.plantree.forestservice.domain.commons.application.CommonBudCountUseCase;
import com.plantree.forestservice.domain.commons.application.CommonsSignupUseCase;
import com.plantree.forestservice.domain.commons.dto.BudCountListResponseDto;
import com.plantree.forestservice.domain.commons.dto.BudCountRequestDto;
import com.plantree.forestservice.domain.commons.dto.CommonsSignupReqDto;
import lombok.RequiredArgsConstructor;
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
    public void createForestAndTree(@RequestBody CommonsSignupReqDto request) {
        commonsSignupUseCase.createForestAndTree(request.getStudentId());
    }

    @PostMapping("/progress")
    public BudCountListResponseDto getBudProgressByStudnetIds(
            @RequestBody BudCountRequestDto request) {
        return commonBudCountUseCase.findBudCountByStudentIds(request.getStudentIds());
    }

}
