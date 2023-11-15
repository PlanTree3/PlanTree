package com.plantree.commonservice.domain.inform.controller;

import com.plantree.commonservice.domain.inform.application.InformCreateUseCase;
import com.plantree.commonservice.domain.inform.application.InformSearchUseCase;
import com.plantree.commonservice.domain.inform.application.InformUpdateUseCase;
import com.plantree.commonservice.domain.inform.dto.InformCreateRequestDto;
import com.plantree.commonservice.domain.inform.dto.InformFileAddRequestDto;
import com.plantree.commonservice.domain.inform.dto.InformUpdateRequestDto;
import com.plantree.commonservice.global.config.webmvc.AuthMember;
import com.plantree.commonservice.global.config.webmvc.JwtLoginMember;
import com.plantree.commonservice.global.responseType.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inform")
@RequiredArgsConstructor
public class InformController {

    private final InformCreateUseCase informCreateUseCase;
    private final InformSearchUseCase informSearchUseCase;
    private final InformUpdateUseCase informUpdateUseCase;

    @GetMapping
    public ResponseEntity<?> searchMyInforms(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                informSearchUseCase.searchMyInforms(authMember));
    }

    @PostMapping("/group/{groupId}")
    public ResponseEntity<?> createInform(@PathVariable UUID groupId,
            @JwtLoginMember AuthMember authMember,
            @ModelAttribute InformCreateRequestDto informCreateRequestDto) {
        return HttpResponse.okWithData(HttpStatus.OK, "생성 성공",
                informCreateUseCase.createInform(groupId, authMember, informCreateRequestDto));
    }

    @GetMapping("/{informId}")
    public ResponseEntity<?> searchInformDetail(@PathVariable UUID informId) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                informSearchUseCase.searchInformDetail(informId));
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<?> searchGroupInforms(@PathVariable UUID groupId) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                informSearchUseCase.searchGroupInforms(groupId));
    }

    @PatchMapping("/{informId}")
    public ResponseEntity<?> modifyInform(@PathVariable UUID informId,
            @JwtLoginMember AuthMember authMember,
            @RequestBody InformUpdateRequestDto informUpdateRequestDto) {
        informUpdateUseCase.updateInform(informId, authMember, informUpdateRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "수정 성공");
    }

    @PostMapping("/{informId}/file")
    public ResponseEntity<?> addInformFile(@PathVariable UUID informId,
            @JwtLoginMember AuthMember authMember,
            @ModelAttribute InformFileAddRequestDto informFileAddRequestDto) {
        informUpdateUseCase.addInformFile(informId, authMember, informFileAddRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "파일 추가 성공");
    }

    @DeleteMapping("/{informId}/file/{fileId}")
    public ResponseEntity<?> deleteInformFile(@PathVariable(value = "informId") UUID informId,
            @PathVariable(value = "fileId") UUID fileId, @JwtLoginMember AuthMember authMember) {
        informUpdateUseCase.deleteInformFile(informId, fileId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "파일 삭제 성공");
    }

}
