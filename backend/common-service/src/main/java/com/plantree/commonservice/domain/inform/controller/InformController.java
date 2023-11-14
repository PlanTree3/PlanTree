package com.plantree.commonservice.domain.inform.controller;

import com.plantree.commonservice.domain.inform.application.InformCreateUseCase;
import com.plantree.commonservice.domain.inform.dto.InformCreateRequestDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.config.webmvc.JwtLoginMember;
import com.plantree.commonservice.global.responseType.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inform")
@RequiredArgsConstructor
public class InformController {

    private final InformCreateUseCase informCreateUseCase;

    @PostMapping("/group/{groupId}")
    public ResponseEntity<?> createInform(@PathVariable UUID groupId,
            @JwtLoginMember AuthMember authMember,
            @ModelAttribute InformCreateRequestDto informCreateRequestDto) {
        return HttpResponse.okWithData(HttpStatus.OK, "생성 성공",
                informCreateUseCase.createInform(groupId, authMember, informCreateRequestDto));
    }

}
