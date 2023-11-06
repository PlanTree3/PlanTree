package com.plantree.forestservice.domain.bud.controller;

import com.plantree.forestservice.domain.bud.application.BudCommentCreateUseCase;
import com.plantree.forestservice.domain.bud.application.BudCommentDeleteUseCase;
import com.plantree.forestservice.domain.bud.application.BudCommentModifyUseCase;
import com.plantree.forestservice.domain.bud.application.BudCommentSearchUseCase;
import com.plantree.forestservice.domain.bud.dto.BudCommentCreateReqDto;
import com.plantree.forestservice.domain.bud.dto.BudCommentModifyReqDto;
import com.plantree.forestservice.domain.bud.dto.BudCreateReqDto;
import com.plantree.forestservice.domain.bud.dto.BudCreateResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.config.webmvc.JwtLoginMember;
import com.plantree.forestservice.global.responseType.HttpResponse;
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
@RequestMapping("tree/{treeId}/bud/{budId}")
@RequiredArgsConstructor
public class BudCommentController {

    private final BudCommentCreateUseCase budCommentCreateUseCase;
    private final BudCommentModifyUseCase budCommentModifyUseCase;
    private final BudCommentDeleteUseCase budCommentDeleteUseCase;
    private final BudCommentSearchUseCase budCommentSearchUseCase;

    @PostMapping("/comment")
    public ResponseEntity<?> addBudComment(@PathVariable UUID treeId, @PathVariable UUID budId,
            @RequestBody BudCommentCreateReqDto reqDto, @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "봉오리 댓글이 작성되었습니다",
                budCommentCreateUseCase.createBudComment(treeId, budId, reqDto.getContent(),
                        authMember));
    }

    @PatchMapping("/comment/{commentId}")
    public ResponseEntity<?> modifyBudComment(@PathVariable UUID treeId, @PathVariable UUID budId,
            @PathVariable Long commentId,
            @RequestBody BudCommentModifyReqDto reqDto, @JwtLoginMember AuthMember authMember) {

        budCommentModifyUseCase.updateComment(treeId, budId, commentId, reqDto.getContent(),
                authMember);
        return HttpResponse.ok(HttpStatus.OK, "봉오리 댓글이 수정되었습니다");
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<?> deleteBudComment(@PathVariable UUID treeId, @PathVariable UUID budId,
            @PathVariable Long commentId, @JwtLoginMember AuthMember authMember) {

        budCommentDeleteUseCase.deleteComment(treeId, budId, commentId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "봉오리 댓글이 삭제되었습니다");
    }

    @GetMapping("/details")
    public ResponseEntity<?> getBudComments(@PathVariable UUID treeId, @PathVariable UUID budId,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "봉오리 목록입니다",
                budCommentSearchUseCase.findComments(treeId, budId, authMember));
    }

}
