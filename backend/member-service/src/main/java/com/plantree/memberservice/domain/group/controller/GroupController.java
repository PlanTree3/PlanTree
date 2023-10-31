package com.plantree.memberservice.domain.group.controller;

import com.plantree.memberservice.domain.group.application.GroupCreateUseCase;
import com.plantree.memberservice.domain.group.application.GroupJoinUseCase;
import com.plantree.memberservice.domain.group.application.GroupModifyUseCase;
import com.plantree.memberservice.domain.group.dto.request.GroupCreateRequestDto;
import com.plantree.memberservice.domain.group.dto.request.GroupJoinAcceptRequestDto;
import com.plantree.memberservice.domain.group.dto.request.GroupJoinRefuseRequestDto;
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
    private final GroupModifyUseCase groupModifyUseCase;
    private final GroupJoinUseCase groupJoinUseCase;

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
        groupModifyUseCase.changeName(groupId, authMember, groupNameChangeRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "그룹 이름 수정 성공");
    }

    @PostMapping("/{groupId}/join-request")
    public ResponseEntity<?> requestJoin(@PathVariable("groupId") UUID groupId,
            @JwtLoginMember AuthMember authMember) {
        groupJoinUseCase.requestJoin(groupId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "가입 신청 성공");
    }

    @PatchMapping("/{groupId}/join-accept")
    public ResponseEntity<?> acceptJoin(@PathVariable("groupId") UUID groupId,
            @JwtLoginMember AuthMember authMember,
            @RequestBody GroupJoinAcceptRequestDto groupJoinAcceptRequestDto) {
        groupJoinUseCase.acceptJoin(groupId, authMember, groupJoinAcceptRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "가입 수락 성공");
    }

    @PatchMapping("/{groupId}/join-refuse")
    public ResponseEntity<?> refuseJoin(@PathVariable("groupId") UUID groupId,
            @JwtLoginMember AuthMember authMember,
            @RequestBody GroupJoinRefuseRequestDto groupJoinRefuseRequestDto) {
        groupJoinUseCase.refuseJoin(groupId, authMember, groupJoinRefuseRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "가입 거절 성공");
    }
}
