package com.plantree.forestservice.domain.commons.controller;

import com.plantree.forestservice.domain.commons.application.CommonsSearchUseCase;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.config.webmvc.JwtLoginMember;
import com.plantree.forestservice.global.responseType.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("commons")
@RequiredArgsConstructor
public class PageController {

    private final CommonsSearchUseCase commonsSearchUseCase;

    @GetMapping("/main/{memberId}")
    public ResponseEntity<?> findMainPage(@PathVariable UUID memberId,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "메인 페이지 정보입니다.",
                commonsSearchUseCase.findMainPage(memberId, authMember));

    }

    @GetMapping("/tree/{treeId}")
    public ResponseEntity<?> findTodoPage(@PathVariable UUID treeId,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "일정 등록 페이지 정보입니다.",
                commonsSearchUseCase.findTodoPage(treeId, authMember));

    }


}
