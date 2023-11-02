package com.plantree.forestservice.domain.seed.controller;

import com.plantree.forestservice.domain.seed.application.SeedCreateUseCase;
import com.plantree.forestservice.domain.seed.application.SeedDeleteUseCase;
import com.plantree.forestservice.domain.seed.application.SeedUpdateUseCase;
import com.plantree.forestservice.domain.seed.dto.SeedCreateReqDto;
import com.plantree.forestservice.domain.seed.dto.SeedCreateResDto;
import com.plantree.forestservice.domain.seed.dto.SeedModifyReqDto;
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
public class SeedController {

    private final SeedCreateUseCase seedCreateUseCase;
    private final SeedUpdateUseCase seedUpdateUseCase;
    private final SeedDeleteUseCase seedDeleteUseCase;

    @PostMapping("/tree/{treeId}/branch/{branchId}/seed")
    public ResponseEntity<?> addSeed(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @RequestBody SeedCreateReqDto seedCreateReqDto,
            @JwtLoginMember AuthMember authMember) {

        return HttpResponse.okWithData(HttpStatus.OK, "씨앗이 생성되었습니다.",
                new SeedCreateResDto(seedCreateUseCase.createSeed(treeId, branchId, authMember,
                        seedCreateReqDto.getName())));

    }

    @PatchMapping("/tree/{treeId}/branch/{branchId}/seed/{seedId}")
    public ResponseEntity<?> updateSeedName(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @PathVariable UUID seedId,
            @RequestBody SeedModifyReqDto seedModifyReqDto,
            @JwtLoginMember AuthMember authMember
    ) {
        seedUpdateUseCase.updateName(treeId, branchId, seedId, authMember,
                seedModifyReqDto.getName());
        return HttpResponse.ok(HttpStatus.OK, "씨앗의 이름을 변경하였습니다.");
    }

    @DeleteMapping("/tree/{treeId}/branch/{branchId}/seed/{seedId}")
    public ResponseEntity<?> deleteSeed(@PathVariable UUID treeId, @PathVariable UUID branchId,
            @PathVariable UUID seedId,
            @JwtLoginMember AuthMember authMember
    ) {
        seedDeleteUseCase.deleteSeed(treeId, branchId, seedId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "씨앗을 삭제하였습니다.");
    }

}
