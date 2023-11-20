package com.plantree.forestservice.domain.tree.controller;

import com.plantree.forestservice.domain.tree.application.TreeModifyUseCase;
import com.plantree.forestservice.domain.tree.application.TreeSearchUseCase;
import com.plantree.forestservice.domain.tree.dto.StudentTreeRequestDto;
import com.plantree.forestservice.domain.tree.dto.StudentTreeResponseDto;
import com.plantree.forestservice.domain.tree.dto.TreeNameModfiyReqDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.config.webmvc.JwtLoginMember;
import com.plantree.forestservice.global.responseType.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tree")
public class TreeController {

    private final TreeSearchUseCase treeSearchUseCase;
    private final TreeModifyUseCase treeModifyUseCase;

    @GetMapping("/{treeId}")
    public ResponseEntity<?> getTreeDetails(@PathVariable UUID treeId,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "나무의 상세 화면입니다.",
                treeSearchUseCase.findTreeDetails(treeId, authMember));

    }

    @PatchMapping("/{treeId}")
    public ResponseEntity<?> modifyTreeName(@PathVariable UUID treeId,
            @RequestBody TreeNameModfiyReqDto treeNameModfiyReqDto,
            @JwtLoginMember AuthMember authMember) {

        treeModifyUseCase.updateTreeName(treeId, authMember, treeNameModfiyReqDto.getName());
        return HttpResponse.ok(HttpStatus.OK, "나무의 이름을 변경하였습니다.");

    }

    @PostMapping("/student-tree")
    public StudentTreeResponseDto searchStudentTreeIds(
            @RequestBody StudentTreeRequestDto studentTreeRequestDto) {
        return treeSearchUseCase.searchStudentTreeIds(studentTreeRequestDto);
    }
}
