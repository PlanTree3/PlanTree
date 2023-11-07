package com.plantree.forestservice.domain.forest.controller;

import com.plantree.forestservice.domain.forest.application.ForestSearchUseCase;
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
@RequestMapping("forest")
@RequiredArgsConstructor
public class ForestController {

    private final ForestSearchUseCase forestSearchUseCase;

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getBudComments(@PathVariable UUID memberId,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "숲 목록입니다",
                forestSearchUseCase.findForests(memberId, authMember));
    }

}
