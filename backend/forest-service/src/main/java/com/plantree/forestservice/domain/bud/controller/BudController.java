package com.plantree.forestservice.domain.bud.controller;

import com.plantree.forestservice.domain.bud.application.BudCreateUseCase;
import com.plantree.forestservice.domain.bud.application.BudDeleteUseCase;
import com.plantree.forestservice.domain.bud.application.BudUpdateUseCase;
import com.plantree.forestservice.domain.bud.dto.BudCreateReqDto;
import com.plantree.forestservice.domain.bud.dto.BudCreateResDto;
import com.plantree.forestservice.domain.bud.dto.BudDayModifyReqDto;
import com.plantree.forestservice.domain.bud.dto.BudNameModifyReqDto;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BudController {

    private final BudCreateUseCase budCreateUseCase;
    private final BudUpdateUseCase budUpdateUseCase;
    private final BudDeleteUseCase budDeleteUseCase;

    @PostMapping("/tree/{treeId}/branch/{branchId}/bud")
    public ResponseEntity<?> addBud(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @RequestBody BudCreateReqDto reqDto, @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "봉오리가 등록되었습니다.",
                new BudCreateResDto(budCreateUseCase.createBud(treeId, branchId, reqDto.getName(),
                        reqDto.getDayOfWeek(), authMember)));

    }

    @PatchMapping("/tree/{treeId}/branch/{branchId}/bud/{budId}/day")
    public ResponseEntity<?> modifyBudDate(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @PathVariable UUID budId, @RequestBody BudDayModifyReqDto reqDto,
            @JwtLoginMember AuthMember authMember) {
        budUpdateUseCase.updateDay(treeId, branchId, budId, reqDto.getDayOfWeek(), authMember);
        return HttpResponse.ok(HttpStatus.OK, "봉오리의 요일을 변경하였습니다.");
    }

    @PatchMapping("/tree/{treeId}/branch/{branchId}/bud/{budId}/complete")
    public ResponseEntity<?> completeBud(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @PathVariable UUID budId, @JwtLoginMember AuthMember authMember) {
        budUpdateUseCase.completeBud(treeId, branchId, budId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "봉오리를 완료하였습니다.");
    }

    @PatchMapping("/tree/{treeId}/branch/{branchId}/bud/{budId}/undo-complete")
    public ResponseEntity<?> undoCompleteBud(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @PathVariable UUID budId, @JwtLoginMember AuthMember authMember) {
        budUpdateUseCase.undoCompleteBud(treeId, branchId, budId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "봉오리 완료를 취소하였습니다.");
    }

    @PatchMapping("/tree/{treeId}/branch/{branchId}/bud/{budId}/name")
    public ResponseEntity<?> modifyBudName(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @PathVariable UUID budId, @RequestBody BudNameModifyReqDto reqDto,
            @JwtLoginMember AuthMember authMember) {
        budUpdateUseCase.updateName(treeId, branchId, budId, reqDto.getName(), authMember);
        return HttpResponse.ok(HttpStatus.OK, "봉오리의 이름을 변경하였습니다.");
    }

    @DeleteMapping("/tree/{treeId}/branch/{branchId}/bud/{budId}")
    public ResponseEntity<?> deleteBud(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @PathVariable UUID budId, @JwtLoginMember AuthMember authMember) {
        budDeleteUseCase.deleteBud(treeId, branchId, budId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "봉오리를 삭제하였습니다.");
    }

}
