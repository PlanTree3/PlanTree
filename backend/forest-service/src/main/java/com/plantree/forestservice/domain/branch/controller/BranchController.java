package com.plantree.forestservice.domain.branch.controller;

import com.plantree.forestservice.domain.branch.application.BranchCreateUseCase;
import com.plantree.forestservice.domain.branch.application.BranchDeleteUseCase;
import com.plantree.forestservice.domain.branch.application.BranchUpdateUseCase;
import com.plantree.forestservice.domain.branch.dto.BranchCreateReqDto;
import com.plantree.forestservice.domain.branch.dto.BranchNameUpdateReqDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.config.webmvc.JwtLoginMember;
import com.plantree.forestservice.global.responseType.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BranchController {

    private final BranchCreateUseCase branchCreateUseCase;
    private final BranchUpdateUseCase branchUpdateUseCase;
    private final BranchDeleteUseCase branchDeleteUseCase;

    @PostMapping("/tree/{treeId}/branch")
    public ResponseEntity<?> addBranch(@PathVariable UUID treeId,
            @RequestBody BranchCreateReqDto branchCreateReqDto,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK,
                "가지가 생성되었습니다.",
                branchCreateUseCase.createBranch(treeId, authMember, branchCreateReqDto));

    }

    @PatchMapping("/tree/{treeId}/branch/{branchId}")
    public ResponseEntity<?> modifyBranchName(@PathVariable UUID treeId,
            @PathVariable UUID branchId,
            @RequestBody BranchNameUpdateReqDto branchNameUpdateReqDto,
            @JwtLoginMember AuthMember authMember) {

        branchUpdateUseCase.updateBranch(treeId, branchId, authMember, branchNameUpdateReqDto);
        return HttpResponse.ok(HttpStatus.OK, "가지 이름이 수정되었습니다.");

    }

    @DeleteMapping("/tree/{treeId}/branch/{branchId}")
    public ResponseEntity<?> deleteBranch(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @JwtLoginMember AuthMember authMember){

        branchDeleteUseCase.dropBranch(treeId, branchId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "가지가 삭제되었습니다.");

    }

    @PostMapping("/group/{groupId}/branch")
    public ResponseEntity<?> addBranchesToAllGroupMembers(@PathVariable Long groupId,
            @JwtLoginMember AuthMember authMember) {

        branchCreateUseCase.createBranchesToAllGroupMembers(groupId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "가지가 일괄 생성되었습니다.");
    }


}
