package com.plantree.memberservice.domain.group.controller;

import com.plantree.memberservice.domain.group.application.NestCreateUseCase;
import com.plantree.memberservice.domain.group.application.NestDeleteUseCase;
import com.plantree.memberservice.domain.group.application.NestJoinUseCase;
import com.plantree.memberservice.domain.group.application.NestModifyUseCase;
import com.plantree.memberservice.domain.group.application.NestSearchUseCase;
import com.plantree.memberservice.domain.group.dto.IsParentOfStudentResponseDto;
import com.plantree.memberservice.domain.group.dto.request.IsParentOfStudentRequestDto;
import com.plantree.memberservice.domain.group.dto.request.NestCreateRequestDto;
import com.plantree.memberservice.domain.group.dto.request.NestNameChangeRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.config.webmvc.JwtLoginMember;
import com.plantree.memberservice.global.dto.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/nest")
public class NestController {

    private final NestCreateUseCase nestCreateUseCase;
    private final NestModifyUseCase nestModifyUseCase;
    private final NestJoinUseCase nestJoinUseCase;
    private final NestSearchUseCase nestSearchUseCase;
    private final NestDeleteUseCase nestDeleteUseCase;

    @PostMapping
    public ResponseEntity<?> createNest(@JwtLoginMember AuthMember authMember,
            @RequestBody NestCreateRequestDto nestCreateRequestDto) {
        return HttpResponse.okWithData(HttpStatus.OK, "둥지 생성 성공",
                nestCreateUseCase.createNest(authMember, nestCreateRequestDto));
    }

    @PatchMapping("/{nestId}/name")
    public ResponseEntity<?> changeName(@PathVariable("nestId") UUID nestId,
            @JwtLoginMember AuthMember authMember,
            NestNameChangeRequestDto nestNameChangeRequestDto) {
        nestModifyUseCase.changeName(nestId, authMember, nestNameChangeRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "둥지 이름 수정 성공");
    }

    @PostMapping("/{nestId}/join-request")
    public ResponseEntity<?> requestJoin(@PathVariable("nestId") UUID nestId,
            @JwtLoginMember AuthMember authMember) {
        nestJoinUseCase.requestJoin(nestId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "둥지 가입 신청 성공");
    }

    @GetMapping("/{nestId}/student")
    public ResponseEntity<?> searchNestStudents(@PathVariable("nestId") UUID nestId,
            @JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                nestSearchUseCase.searchNestStudents(nestId, authMember));
    }

    @DeleteMapping("/{nestId}")
    public ResponseEntity<?> deleteNest(@PathVariable UUID nestId,
            @JwtLoginMember AuthMember authMember) {
        nestDeleteUseCase.deleteNest(nestId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "삭제 성공");
    }

    @PostMapping("/check-parent")
    public IsParentOfStudentResponseDto getIsParentOfStudent(
            @RequestBody IsParentOfStudentRequestDto isParentOfStudentRequestDto) {
        return nestSearchUseCase.getIsParentOfStudent(isParentOfStudentRequestDto);
    }
}
