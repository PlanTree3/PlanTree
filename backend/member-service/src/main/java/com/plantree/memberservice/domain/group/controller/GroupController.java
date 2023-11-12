package com.plantree.memberservice.domain.group.controller;

import com.plantree.memberservice.domain.group.application.GroupCreateUseCase;
import com.plantree.memberservice.domain.group.application.GroupDeleteUseCase;
import com.plantree.memberservice.domain.group.application.GroupJoinUseCase;
import com.plantree.memberservice.domain.group.application.GroupModifyUseCase;
import com.plantree.memberservice.domain.group.application.GroupSearchUseCase;
import com.plantree.memberservice.domain.group.dto.GroupStudentIdsResponseDto;
import com.plantree.memberservice.domain.group.dto.IsTeacherOfGroupResponseDto;
import com.plantree.memberservice.domain.group.dto.IsTeacherOfStudentResponseDto;
import com.plantree.memberservice.domain.group.dto.request.GroupCreateRequestDto;
import com.plantree.memberservice.domain.group.dto.request.GroupJoinAcceptRequestDto;
import com.plantree.memberservice.domain.group.dto.request.GroupJoinRefuseRequestDto;
import com.plantree.memberservice.domain.group.dto.request.GroupNameChangeRequestDto;
import com.plantree.memberservice.domain.group.dto.request.IsTeacherOfGroupRequestDto;
import com.plantree.memberservice.domain.group.dto.request.IsTeacherOfStudentRequestDto;
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
@RequestMapping("/group")
public class GroupController {

    private final GroupCreateUseCase groupCreateUseCase;
    private final GroupModifyUseCase groupModifyUseCase;
    private final GroupJoinUseCase groupJoinUseCase;
    private final GroupSearchUseCase groupSearchUseCase;
    private final GroupDeleteUseCase groupDeleteUseCase;

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

    @GetMapping("/{groupId}/join-request")
    public ResponseEntity<?> searchJoinRequestList(@PathVariable("groupId") UUID groupId,
            @JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                groupJoinUseCase.searchJoinRequestList(groupId, authMember));
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

    @GetMapping("/student-group")
    public ResponseEntity<?> searchGroupAndNest(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                groupSearchUseCase.searchGroupAndNest(authMember));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<?> searchGroupDetail(@PathVariable UUID groupId,
            @JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                groupSearchUseCase.searchGroupDetail(groupId, authMember));
    }

    @GetMapping("/teacher-group")
    public ResponseEntity<?> searchTeacherGroups(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                groupSearchUseCase.searchTeacherGroups(authMember));
    }

    @GetMapping("/{groupId}/student")
    public ResponseEntity<?> searchGroupStudent(@PathVariable UUID groupId,
            @JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                groupSearchUseCase.searchGroupStudents(groupId, authMember));
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable UUID groupId,
            @JwtLoginMember AuthMember authMember) {
        groupDeleteUseCase.deleteGroup(groupId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "삭제 성공");
    }

    @PostMapping("/{groupId}/student-id")
    public GroupStudentIdsResponseDto searchStudentIds(@PathVariable UUID groupId) {
        return groupSearchUseCase.searchStudentIds(groupId);
    }

    @PostMapping("/student/check-leader")
    public IsTeacherOfStudentResponseDto getIsTeacherOfStudent(
            @RequestBody IsTeacherOfStudentRequestDto isTeacherOfStudentRequestDto) {
        return groupSearchUseCase.getIsTeacherOfStudent(isTeacherOfStudentRequestDto);
    }

    @PostMapping("/{groupId}/check-leader")
    public IsTeacherOfGroupResponseDto getIsTeacherOfGroup(@PathVariable UUID groupId,
            @RequestBody IsTeacherOfGroupRequestDto isTeacherOfGroupRequestDto) {
        return groupSearchUseCase.getIsTeacherOfGroup(groupId, isTeacherOfGroupRequestDto);
    }

}
