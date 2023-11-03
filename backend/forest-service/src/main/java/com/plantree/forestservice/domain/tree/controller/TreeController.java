package com.plantree.forestservice.domain.tree.controller;

import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.dto.BranchProjectionDto;
import com.plantree.forestservice.domain.tree.application.TreeSearchUseCase;
import com.plantree.forestservice.domain.tree.dto.BranchResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.config.webmvc.JwtLoginMember;
import com.plantree.forestservice.global.responseType.HttpResponse;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TreeController {

    private final TreeSearchUseCase treeSearchUseCase;

    @GetMapping("/tree/{treeId}")
    public List<BranchResDto> getTreeDetails(@PathVariable UUID treeId,
            @JwtLoginMember AuthMember authMember) {

//        return HttpResponse.okWithData(HttpStatus.OK, "나무의 상세 화면입니다.",
//                treeSearchUseCase.findTreeDetails(treeId, authMember));
        return treeSearchUseCase.findBranches(treeId);

    }

}
