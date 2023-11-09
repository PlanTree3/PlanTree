package com.plantree.memberservice.domain.member.controller;

import com.plantree.memberservice.domain.member.application.MemberModifyUseCase;
import com.plantree.memberservice.domain.member.application.MemberSearchUseCase;
import com.plantree.memberservice.domain.member.dto.MemberNameRequestDto;
import com.plantree.memberservice.domain.member.dto.MemberNameResponseDto;
import com.plantree.memberservice.domain.member.dto.NameChangeRequestDto;
import com.plantree.memberservice.domain.member.dto.ProfileImageChangeRequestDto;
import com.plantree.memberservice.global.config.webmvc.AuthMember;
import com.plantree.memberservice.global.config.webmvc.JwtLoginMember;
import com.plantree.memberservice.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberModifyUseCase memberModifyUseCase;
    private final MemberSearchUseCase memberSearchUseCase;

    @GetMapping("/health-check")
    public ResponseEntity<?> healthCheck(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.ok(HttpStatus.OK, "멤버서비스");
    }

    @PatchMapping("/profile-image")
    public ResponseEntity<?> changeProfileImage(@JwtLoginMember AuthMember authMember,
            @RequestBody ProfileImageChangeRequestDto profileImageChangeRequestDto) {
        memberModifyUseCase.changeProfileImage(authMember, profileImageChangeRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "프로필 이미지 수정 성공");
    }

    @PatchMapping("/name")
    public ResponseEntity<?> changeName(@JwtLoginMember AuthMember authMember,
            @RequestBody NameChangeRequestDto nameChangeRequestDto) {
        memberModifyUseCase.changeName(authMember, nameChangeRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "이름 수정 성공");
    }

    @GetMapping
    public ResponseEntity<?> searchMemberInfo(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                memberSearchUseCase.searchMemberInfo(authMember));
    }

    @PostMapping("/name")
    public MemberNameResponseDto searchMemberNames(
            @RequestBody MemberNameRequestDto memberNameRequestDto) {
        return memberSearchUseCase.searchMemberNames(memberNameRequestDto);
    }
}
