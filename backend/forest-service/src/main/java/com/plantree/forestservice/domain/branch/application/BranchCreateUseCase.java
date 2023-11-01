package com.plantree.forestservice.domain.branch.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.dto.BranchCreateReqDto;
import com.plantree.forestservice.domain.branch.dto.BranchCreateResDto;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.util.MemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BranchCreateUseCase {

    private final BranchRepository branchRepository;
    private final TreeRepository treeRepository;
    private final MemberValidator memberValidator;

    @Transactional
    public BranchCreateResDto createBranch(UUID treeId, AuthMember authMember,
            BranchCreateReqDto branchCreateReqDto) {

        Tree tree = treeRepository.findById(treeId).orElseThrow(TreeNotFoundException::new);
        UUID studentId = tree.getStudentId();

        switch (authMember.getRole()) {
            case PARENT:
                memberValidator.checkParentOfStudentFromTreeId(studentId, authMember);
            case TEACHER:
                memberValidator.checkTeacherOfStudentFromTreeId(studentId, authMember);
            case STUDENT:
                memberValidator.checkOwnerOfTreeId(studentId, authMember);
        }

        Branch branch = branchRepository.save(Branch.builder()
                .name(branchCreateReqDto.getContent())
                .issuerId(authMember.getMemberId())
                .studentId(tree.getStudentId())
                .build());

        return BranchCreateResDto.builder()
                .branchId(branch.getId())
                .branchColor(branch.getColor())
                .build();
    }

    @Transactional
    public void createBranchesToAllGroupMembers(Long groupId, AuthMember authMember) {

    }
}
