package com.plantree.memberservice.domain.group.controller;

import com.plantree.memberservice.domain.group.application.GroupCreateUseCase;
import com.plantree.memberservice.domain.group.application.GroupNameChangeUseCase;
import com.plantree.memberservice.domain.group.dto.request.GroupCreateRequestDto;
import com.plantree.memberservice.domain.group.dto.request.GroupNameChangeRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.config.webmvc.JwtLoginMember;
import com.plantree.memberservice.global.dto.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
public class GroupController {

    private final GroupCreateUseCase groupCreateUseCase;
    private final GroupNameChangeUseCase groupNameChangeUseCase;

    @PostMapping
    public ResponseEntity<?> createGroup(@JwtLoginMember AuthMember authMember,
            @RequestBody GroupCreateRequestDto groupCreateRequestDto) {
        return HttpResponse.okWithData(HttpStatus.OK, "그룹 생성 성공",
                groupCreateUseCase.createGroup(authMember, groupCreateRequestDto));
    }

    @PatchMapping("/{groupId}/name")
    public ResponseEntity<?> changeName(@PathVariable("groupId") UUID groupId,
            @JwtLoginMember AuthMember authMember,
            GroupNameChangeRequestDto groupNameChangeRequestDto) {
        groupNameChangeUseCase.changeName(groupId, authMember, groupNameChangeRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "그룹 이름 수정 성공");
    }
}