package com.plantree.forestservice.domain.branch.controller;

import com.plantree.forestservice.domain.branch.application.BranchCreateUseCase;
import com.plantree.forestservice.domain.branch.dto.BranchCreateReqDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.config.webmvc.JwtLoginMember;
import com.plantree.forestservice.global.responseType.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BranchController {

    private final BranchCreateUseCase branchCreateUseCase;

    @PostMapping("/tree/{treeId}/branch")
    public ResponseEntity<?> addBranch(@PathVariable UUID treeId,
            BranchCreateReqDto branchCreateReqDto,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK,
                "브랜치가 생성되었습니다.",
                branchCreateUseCase.createBranch(treeId, authMember, branchCreateReqDto));

    }

    @PostMapping("/group/{groupId}/branch")
    public ResponseEntity<?> addBranchesToAllGroupMembers(@PathVariable Long groupId,
            @JwtLoginMember AuthMember authMember) {

        branchCreateUseCase.createBranchesToAllGroupMembers(groupId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "브랜치가 일괄 생성되었습니다.");
    }


}
