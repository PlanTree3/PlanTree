package com.plantree.forestservice.domain.branch.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.dto.BranchNameUpdateReqDto;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Branch.BranchNotFoundException;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.util.MemberValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BranchUpdateUseCase {

    private final BranchRepository branchRepository;
    private final TreeRepository treeRepository;
    private final MemberValidator memberValidator;

    @Transactional
    public void updateBranch(UUID treeId, UUID branchId,
            AuthMember authMember,
            BranchNameUpdateReqDto branchNameUpdateReqDto) {

        Tree tree = treeRepository.findById(treeId).orElseThrow(TreeNotFoundException::new);
        memberValidator.validateAuthMember(tree.getStudentId(), authMember);

        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(BranchNotFoundException::new);

        branch.updateName(branchNameUpdateReqDto.getName());
    }
}
